class RoundTable::API
  @@sockets = Hash.new { |sockets, space|
    sockets[space] = Hash.new { |channels, channel|
      channels[channel] = Hash.new {}
    };
  }
  @@master_endpoint_ids = Hash.new { |endpoints, space| endpoints[space] = [] } 

  # Get space languages
  get '/spaces/:space/languages' do
    languages = @@master_endpoint_ids[params[:space]].map { |msg|
      msg['language']}.to_set.to_a
    JSON.generate(languages)
  end

  def register_socket(ws, channel, message)
    translator_language = nil
    if message['role'] == 'translator'
      translator_language = message['language']
    end
    @@sockets[message['space']][channel][ws] = translator_language
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

          case message['action']
            when 'register-master'
              @@master_endpoint_ids[message['space']] |= [{
                'role' => message['role'],
                'language' => message['language'],
                'endpointId' => message['endpointId'],
                'socket' => ws
              }]

              viewer_response = get_viewer_response(message)
              unless viewer_response.nil?
                send_message(message['space'], viewer_response)
              end
            when 'register-viewer'
              viewer_response = get_viewer_response(message)
              unless viewer_response.nil?
                ws.send(viewer_response.to_json)
              end
            when 'instructor-resumed', 'instructor-paused', 'update-heartbeat'
              send_message(message['space'], message)
            when 'subscribe'
              register_socket(ws, message['channel'], message)
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

end
