require 'base64'
require_relative '../spec_helper'

describe RoundTable::API do
  before(:all) do
    redis.flushdb
    create_sample_user
  end

  it "should ask for authentication" do
    expect_ask_for_auth

    auth_header("user", "invalid")
    expect_ask_for_auth
  end

  it "should authenticate a user" do
    auth_header("user", "swordfish")

    get '/auth/basic'
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

  def expect_ask_for_auth
    get '/auth/basic'
    expect(last_response.status).to eq(401)
    expect(last_response.header).to include("WWW-Authenticate")
  end

  def auth_header(login, password)
    encoded = Base64.encode64("#{login}:#{password}")
    header "Authorization", "Basic #{encoded}"
  end
end
