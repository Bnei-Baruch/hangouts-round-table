require 'base64'
require_relative '../spec_helper'

describe RoundTable::API do
  before(:all) do
    redis.flushdb
    create_sample_user
  end

  it "should report invalid credentials" do
    body = {
      :login => "user",
      :password => "invalid"
    }.to_json
    post '/auth/tokens', body
    expect(last_response).to be_bad_request
  end

  it "should authenticate a user" do
    body = {
      :login => "user",
      :password => "swordfish"
    }.to_json

    post '/auth/tokens', body
    expect(last_response).to be_successful

    json_response = JSON.parse(last_response.body)
    expect(json_response).to include('token')
    expect(json_response['token'].empty?).to be_falsy
    expect(json_response['space']).to eq("default")
  end

  def create_sample_user
    sample_user = {
      :password => BCrypt::Password.create("swordfish"),
      :space => "default"
    }.to_json

    redis.set('auth_user_user', sample_user)
  end
end
