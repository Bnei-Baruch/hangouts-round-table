require_relative '../spec_helper'

describe RoundTable::API do

  before(:each) do
    # Clear the enpoints hash for each test.
    RoundTable::API.class_variable_get(:@@master_endpoint_ids).clear
  end

  it "should fail when accessing directly" do
    get '/socket'
    expect(last_response).to be_bad_request
  end

  it "should register viewer and not get notified on translator presence (no instructor)" do
    register_master_message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-endpoint-id',
      'role' => 'translator',
      'language' => 'fake-language'
    }
    send_ws_message(register_master_message)

    register_viewer_message = {
      'space' => 'fake-space',
      'action' => 'register-viewer',
      'language' => 'fake-language',
    }
    send_ws_message(register_viewer_message) { |viewer_socket|
      expect(viewer_socket).to_not receive(:send)
    }
  end

  it "should register translator and notify all viewers (with existing instructor)" do
    message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-instructor-endpoint-id',
      'role' => 'instructor',
      'language' => 'instructor-fake-language'
    }
    send_ws_message(message)
    message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-translator-endpoint-id',
      'role' => 'translator',
      'language' => 'translator-fake-language'
    }
    forwarded_message = {
      'space' => 'fake-space',
      'action' => 'assign-master-endpoint',
      'instructorEndpointId' => 'fake-instructor-endpoint-id',
      'translatorEndpointId' => 'fake-translator-endpoint-id',
    }
    verify_message(message, forwarded_message: forwarded_message)
  end

  it "should register viewer with no feedback if there's no instructor nor translator" do
    register_viewer_message = {
      'space' => 'fake-space',
      'action' => 'register-viewer',
      'language' => 'fake-language'
    }
    send_ws_message(register_viewer_message) { |viewer_socket|
      expect(viewer_socket).to_not receive(:send)
    }
  end

  it "should register viewer and get notified on instructor presence (no translator)" do
    register_master_message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-instructor-endpoint-id',
      'role' => 'instructor',
      'language' => 'fake-language'
    }
    send_ws_message(register_master_message)

    register_viewer_message = {
      'space' => 'fake-space',
      'action' => 'register-viewer',
      'language' => 'fake-language',
    }
    forwarded_message = {
      'space' => 'fake-space',
      'action' => 'assign-master-endpoint',
      'instructorEndpointId' => 'fake-instructor-endpoint-id',
      'translatorEndpointId' => nil,
    }
    json_message = JSON.generate(forwarded_message)
    send_ws_message(register_viewer_message) { |viewer_socket|
      expect(viewer_socket).to receive(:send).with(json_message)
    }
  end

  it "should register instructor and notify all viewers (no translator)" do
    message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-instructor-endpoint-id',
      'role' => 'instructor',
      'language' => 'fake-language'
    }
    forwarded_message = {
      'space' => 'fake-space',
      'action' => 'assign-master-endpoint',
      'instructorEndpointId' => 'fake-instructor-endpoint-id',
      'translatorEndpointId' => nil,
    }
    verify_message(message, forwarded_message: forwarded_message)
  end

  it "should notify all clients in a space on resumed broadcast" do
    message = {
      'space' => 'fake-space',
      'action' => 'instructor-resumed'
    }
    verify_message(message)
  end

  it "should notify all clients in a space paused broadcast" do
    message = {
      'space' => 'fake-space',
      'action' => 'instructor-paused'
    }
    verify_message(message)
  end

  it "should nofity subscribed client with heartbeat in a space" do
    subscribe_message = {
      'space' => 'fake-space',
      'action' => 'subscribe',
      'channel' => 'fake-channel'
    }
    different_space_subscribe_message = {
      'space' => 'another-fake-space',
      'action' => 'subscribe',
      'channel' => 'fake-channel'
    }
    channel_message = {
      'space' => 'fake-space',
      'channel' => 'fake-channel',
      'fake-header' => 'fake-content',
      'action' => 'update-heartbeat'
    }
    json_message = JSON.generate(channel_message)

    send_ws_message(subscribe_message) { |channel_socket|
      expect(channel_socket).to receive(:send).with(json_message)
    }
    send_ws_message(different_space_subscribe_message) { |channel_socket|
      expect(channel_socket).not_to receive(:send)
    }
    verify_message(channel_message, broadcast: false)
  end

  it "should return empty list of languages if no instructor or translators present" do
    get "/spaces/fake-space/languages"
    languages = JSON.parse(last_response.body)
    expect(languages).to eq([])
  end

  it "should return list of supported languages for a space" do
    message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-instructor-endpoint-id',
      'role' => 'instructor',
      'language' => 'fake-language-1'
    }
    send_ws_message(message)
    message = {
      'space' => 'fake-space',
      'action' => 'register-master',
      'endpointId' => 'fake-translator-endpoint-id',
      'role' => 'translator',
      'language' => 'fake-language-2'
    }
    send_ws_message(message)

    get "/spaces/fake-space/languages"
    languages = JSON.parse(last_response.body)
    expect(languages).to eq(["fake-language-1", "fake-language-2"])
  end

  def verify_message(message, forwarded_message: nil, broadcast: true)
    forwarded_message ||= message
    json_message = JSON.generate(forwarded_message)

    sockets = []
    4.times do
      sockets.push(create_client_socket(message['space']))
    end
    other_sockets = []
    5.times do
      other_sockets.push(create_client_socket('other-space'))
    end

    if broadcast
      sockets.each { |socket| expect(socket).to receive(:send).with(json_message) }
    else
      sockets.each { |socket| expect(socket).to_not receive(:send) }
    end
    other_sockets.each { |socket| expect(socket).to_not receive(:send) }
    send_ws_message(message)
  end

  def create_client_socket(space)
    message = {
      'space' => space
    }
    send_ws_message(message)
  end

  def send_ws_message(message, &block)
    allow_any_instance_of(Sinatra::Request).to \
      receive(:websocket?).and_return(true)

    json_message = JSON.generate(message)
    ws_mock = WebsocketMock.new(json_message)

    if not block.nil?
      block.call(ws_mock)
    end

    allow_any_instance_of(Sinatra::Request).to \
      receive(:websocket).and_yield(ws_mock)

    allow(EM).to receive(:next_tick).and_yield

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
