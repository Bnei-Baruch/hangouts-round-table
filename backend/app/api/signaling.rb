class RoundTable::API
  @@sockets = Hash.new { |sockets, space|
    sockets[space] = Hash.new { |channels, channel| channels[channel] = [] };
  }
  @@master_endpoint_ids = { }

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
          @@sockets[message['space']]['broadcast'] |= [ws]

          case message['action']
            when 'register-master'
              @@master_endpoint_ids[message['space']] = message['endpointId']
              viewer_response = get_viewer_response(message['space'])
              send_message(message['space'], viewer_response)
            when 'register-viewer'
              viewer_response = get_viewer_response(message['space'])
              unless viewer_response.nil?
                ws.send(viewer_response.to_json)
              end
            when 'master-resumed', 'master-paused', 'update-heartbeat'
              send_message(message['space'], message)
            when 'subscribe'
              @@sockets[message['space']][message['channel']] |= [ws]
          end
        end
        ws.onclose do
          @@sockets.each{ |_, channel_sockets|
            channel_sockets.delete_if { |_,v| v == ws }
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
      sockets = @@sockets[space][message['channel']]
    else
      sockets = @@sockets[space]['broadcast']
    end
    encoded_message = message.to_json
    EM.next_tick{ sockets.each{ |sock| sock.send(encoded_message) } }
  end

  def get_viewer_response(space)
    if @@master_endpoint_ids.include? space
      {
        :action => 'assign-master-endpoint',
        :endpointId => @@master_endpoint_ids[space]
      }
    else
      nil
    end
  end

end
