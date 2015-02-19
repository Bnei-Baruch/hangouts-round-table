require_relative '../spec_helper'

describe RoundTable::API do
  it "should fail when accessing directly" do
    get '/socket'
    expect(last_response).to be_bad_request
  end

  it "should register endpoint for a specific role" do
    send_ws_message("kuku")
  end

  def send_ws_message(msg)
    app.helpers.request.stub(:websocket?).and_return(true)
    app.helpers.request.stub(:websocket).and_return(WebsocketMock.new(msg))
    get '/socket'
  end

  class WebsocketMock

    def initialize(msg)
      @msg = msg
    end

    def send
    end

    def onmessage
    end

    def onclose
    end
  end
end
