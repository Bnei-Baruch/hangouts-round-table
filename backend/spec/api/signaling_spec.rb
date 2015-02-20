require_relative '../spec_helper'

describe RoundTable::API do
  it "should fail when accessing directly" do
    get '/socket'
    expect(last_response).to be_bad_request
  end

  it "should notify clients on paused broadcast" do
    message = {
      'space' => 'fake-space',
      'action' => 'master-paused'
    }

    expect_any_instance_of(WebsocketMock).to receive(:send)

    send_ws_message(message)
  end

  xit "should notify clients on resumed broadcast" do
  end

  # xit "should register endpoint for a specific role" do
  #   message = {
  #     'space' => 'fake-space',
  #     'action' => 'register-master',
  #     'endpoint' => 'fake-endpoint-id',
  #   }
  #   send_ws_message(message)
  # end

  def send_ws_message(message)
    allow_any_instance_of(Sinatra::Request).to \
      receive(:websocket?).and_return(true)

    json_message = JSON.generate(message)
    ws_mock = WebsocketMock.new(json_message)

    allow_any_instance_of(Sinatra::Request).to \
      receive(:websocket).and_yield(ws_mock)

    get '/socket'

    ws_mock
  end

  class WebsocketMock

    def initialize(message)
      @message = message
    end

    def send(message)
    end

    def onmessage
      yield @message
    end

    def onclose
    end
  end
end
