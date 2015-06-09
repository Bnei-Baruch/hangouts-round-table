require 'csv'


class RoundTable::API
  @@sockets = Hash.new { |sockets, space|
    sockets[space] = Hash.new { |channels, channel|
      channels[channel] = Hash.new {}
    };
  }
  @@master_endpoint_ids = Hash.new { |endpoints, space| endpoints[space] = [] } 

  # Get instructor status
  get '/spaces/:space/instructor-status' do
    status = get_instructor_status(params[:space])
    {
      'status' => status
    }.to_json
  end

  # Get space live-id
  get '/spaces/:space/live-id' do
    status = get_instructor_status(params[:space])
    live_id = nil
    if ['broadcasting', 'paused'].include? status
      live_id = @@live_ids[params[:space]]
    end
    {
      "id" => live_id
    }.to_json
  end

  # Get space languages
  get '/spaces/:space/languages' do
    languages = @@master_endpoint_ids[params[:space]].map { |msg|
      msg['language']}.to_set.to_a
    JSON.generate(languages)
  end

  def get_instructor_status(space)
    endpoints = @@master_endpoint_ids[params[:space]].select { |endpoint|
      endpoint['role'] == 'instructor'
    }
    endpoints.first['status'] unless endpoints.empty?
  end

  def register_socket(ws, channel, message)
    translator_language = nil
    if message['role'] == 'translator'
      translator_language = message['language']
    end
    @@sockets[message['space']][channel][ws] = translator_language
  end

  def set_master_endpoint_status(space, ws, status)
    @@master_endpoint_ids[space].each { |endpoint|
      if endpoint['socket'] == ws
        endpoint['status'] = status
      else
        endpoint['status'] = nil
      end
    }
  end

  @@live_ids = {}
  def update_live_id(message)
    @@live_ids[message['space']] = message['id']
  end

  # Websocket
  get '/socket' do
    if !request.websocket?
      status 400
      {
        :error => "The resource should be accessed via WebSockets API"
      }.to_json
    else
      request.websocket do |ws|
        ws.onmessage do |msg|
          message = JSON.parse(msg)

          warn("Got message %s" % msg)

          # Register socket if not registered
          register_socket(ws, 'broadcast', message)
          aggregate_info_for_log(ws, message)

          print_info_to_tsv

          case message['action']
            when 'register-master'
              endpoint = {
                'role' => message['role'],
                'language' => message['language'],
                'endpointId' => message['endpointId'],
                'socket' => ws,
                'status' => 'init'
              }
              @@master_endpoint_ids[message['space']] |= [endpoint]

              viewer_response = get_viewer_response(message)
              unless viewer_response.nil?
                send_message(message['space'], viewer_response)
              end
            when 'register-viewer'
              viewer_response = get_viewer_response(message)
              unless viewer_response.nil?
                ws.send(viewer_response.to_json)
              end
            when 'instructor-resumed'
              set_master_endpoint_status(message['space'], ws, 'broadcasting')
              send_message(message['space'], message)
            when 'instructor-paused'
              set_master_endpoint_status(message['space'], ws, 'paused')
              send_message(message['space'], message)
            when 'update-heartbeat'
              send_message(message['space'], message)
            when 'subscribe'
              register_socket(ws, message['channel'], message)
            when 'update-live-id'
              update_live_id(message)
          end
        end
        ws.onclose do
          @@sockets.each{ |space, channel_sockets|
            channel_sockets.each { |channel, sockets_hash|
              if sockets_hash.key? ws
                if !sockets_hash[ws].nil?
                  send_message(space, {
                    'action' => 'unregister-translator',
                    'space' => space,
                    'language' => sockets_hash[ws]
                  })
                end
                sockets_hash.delete ws
              end
            }
          }
          @@master_endpoint_ids.each{ |_, endpoints|
            endpoints.delete_if { |endpoint| endpoint['socket'] == ws }
          }
          clean_agregated_data(ws)
          warn("Websocket closed")
        end
      end  # request.websocket do
    end  # request.websocket?
  end  # get '/socket' do

  def send_message(space, message)
    # Don't broadcast messages which have 'channel' attribute, send them to
    # sockets which specifically subscribed to that channel.
    sockets = []
    if message.key?('channel') && message['channel']
      channel_name = message['channel']
    else
      channel_name = 'broadcast'
    end
    sockets = @@sockets[space][channel_name].keys
    encoded_message = message.to_json
    warn("Sent message %s" % message)
    EM.next_tick{ sockets.each{ |sock| sock.send(encoded_message) } }
  end

  def get_viewer_response(message)
    endpoints = @@master_endpoint_ids[message['space']]

    if message['role'] == 'translator'
      master = endpoints.select { |endpoint|
        endpoint['role'] == message['role'] and
        endpoint['language'] == message['language']
      }
    else
      master = endpoints.select { |endpoint|
        endpoint['role'] == message['role']
      }
    end

    if not master.empty?
      {
        'space' => message['space'],
        'action' => 'assign-master-endpoint',
        'role' => message['role'],
        'language' => message['language'],
        'endpointId' => master.last['endpointId'],
      }
    else
      nil
    end
  end

  @@spaces = {}
  @@users_by_ws = {}
  @@users_by_id = {}

  def clean_agregated_data(ws)
    user = @@users_by_ws.delete(ws)
    @@users_by_id.delete(user['participantId']) unless user.nil?

    @@spaces.delete_if { |space, data|
      data['ws'] == ws
    }
  end

  def clean_stale_users()
    @@users_by_ws.delete_if { |ws, user|
      user['last_seen_by_other'].to_i + 60 < Time.now.to_i
    }
    @@users_by_id.delete_if { |ws, user|
      user['last_seen_by_other'].to_i + 60 < Time.now.to_i
    }
  end

  def get_user(ws, id)
    u_ws = nil
    u_id = nil
    if not ws.nil? and @@users_by_ws.has_key? ws 
      u_ws = @@users_by_ws[ws]
    end
    if not id.nil? and @@users_by_id.has_key? id 
      u_id = @@users_by_id[id]
    end
    u = u_ws || u_id
    if u.nil?
      u = {}
    end
    @@users_by_id[id] = u if not id.nil?
    @@users_by_ws[ws] = u if not ws.nil?
    u
  end

  def aggregate_info_for_log(ws, message)
    clean_stale_users()

    case message['action']
    when 'register-master'
      update_instructor_state(ws, message['space'], 'init')
    when 'instructor-paused'
      update_instructor_state(ws, message['space'], 'pause')
    when 'instructor-resumed'
      update_instructor_state(ws, message['space'], 'resume')
    #when 'register-viewer'
    #when 'subscribe'
    when 'update-heartbeat'
      aggregate_heartbeat(ws, message)
    end
  end

  def update_instructor_state(ws, space, status)
    now = Time.now.utc

    @@spaces[space] = {
      'ws' => ws,
      'status' => status,
      'timestamp' => now
    }
  end

  def aggregate_heartbeat(ws, message)
    now = Time.now.utc

    update_user(get_user(ws, message['participantId']), message, now)

    message['participants'].each { |p_message|
      p = get_user(nil, p_message['participantId'])
      p['tableId'] = message['tableId']
      p['last_seen_by_other'] = now
      p_message.each { |key, value|
        p[key] = value
      }
      ['space', 'language'].each { |key|
        p[key] = message[key]
      } 
    }
  end

  def update_user(user, message, now)
    user['last_heartbeat'] = now
    message.each { |key, value|
      if not ['action', 'channel', 'participants', 'role'].include? key
        user[key] = value
      end
    } 
  end

  def print_info_to_tsv()
    now = Time.now.utc

    users = Set.new(@@users_by_id.values() + @@users_by_ws.values())
    CSV.open(config['sessions_logs']['users'], "a+") do |csv|
      users.each { |user| 
        if @@spaces.key?(user['space'])
          row = [now.to_s]
          ['last_heartbeat', 'last_seen_by_other', 'space', 'language',
           'tableId', 'participantName', 'participantId'].each { |key|
            if ['last_heartbeat', 'last_seen_by_other'].include? key
              row << user[key].to_s
            else
              row << user[key]
            end
          }
          if user.key? 'browser'
            row << user['browser']['name']
            row << user['browser']['version']
          else
            row << '' << ''
          end
          csv << row
        end
      }
    end

    tables = {}
    users.each { |user|
      table = {}
      table_id = user['tableId']
      table = tables[table_id] if tables.key? table_id

      table['users'] = 0 unless table.key? 'users'
      table['users'] += 1

      table['tableId'] = user['tableId']
      table['space'] = user['space']
      table['language'] = user['language']

      tables[table_id] = table
    }
    CSV.open(config['sessions_logs']['tables'], "a+") do |csv|
      tables.values().each { |table|
        if @@spaces.key?(table['space'])
          row = [now.to_s]
          ['tableId', 'space', 'language', 'users'].each { |key|
            row << table[key]
          }
          csv << row
        end
      }
    end

    CSV.open(config['sessions_logs']['space'], "a+") do |csv|
      @@spaces.each { |space, data|
        row = [now.to_s, space, data['status'], data['timestamp'].to_s]
        csv << row
      }
    end
  end
end
