require 'sinatra-websocket'


class RoundTable::API
  @sockets = Hash.new { |sockets, space| sockets[space] = []; }
  @master_endpoint_ids = { }

  # Websocket
  get '/socket' do
    if !request.websocket?
      status 400
      { }.to_json
    else
      request.websocket do |ws|
        ws.onmessage do |msg|
          message = JSON.parse(msg)

          @sockets[message['space']] << ws

          case message['action']
          when 'masterResumed', 'masterPaused'
            broadcast_message(message['space'], message)
          when 'registerMaster'
            @master_endpoint_ids[message['space']] = message['endpointId']
            viewer_response = get_viewer_response(message['space'])
            broadcast_message(message['space'], viewer_response)
          when 'registerViewer'
            viewer_response = get_viewer_response(message['space'])
            unless viewer_response.nil?
              ws.send(viewer_response.to_json)
            end
          end
        end
        ws.onclose do
          sockets = @sockets.values.select { |values| values.include? ws }
          sockets.delete(ws)
          warn("Websocket closed")
        end
      end
    end
  end


  def broadcast_message(space, message)
    encoded_message = message.to_json
    EM.next_tick { @sockets[space].each{|sock| sock.send(encoded_message) } }
  end

  def get_viewer_response(space)
    if @master_endpoint_ids.include? space
      {
        :action => 'assignMasterEndpoint',
        :endpointId => @master_endpoint_ids[space]
      }
    else
      nil
    end
  end

end
