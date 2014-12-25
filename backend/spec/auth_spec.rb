require_relative 'spec_helper'

describe RoundTable::API do
  def app; RoundTable::API.new; end

  before(:all) do
    app.settings.redis.flushdb
    create_sample_user
  end

  it "should authenticate a user" do
    body = {
      :user => "invalid",
      :password => "user"
    }.to_json

    post '/auth/tokens', body
    expect(last_response).to be_bad_request

    body = {
      :user => "user",
      :password => "swordfish"
    }.to_json

    post '/auth/tokens', body
    expect(last_response).to be_successful
    json_response = JSON.parse(last_response.body)
    expect(json_response).to include('token')
    expect(json_response['token'].empty?).to be_falsy
  end

  def create_sample_user
    sample_user = {
      :password => BCrypt::Password.create("swordfish"),
      :space => "default"
    }.to_json

    app.settings.redis.set('auth_user_user', sample_user)
  end

end
