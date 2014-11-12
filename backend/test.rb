ENV['RACK_ENV'] = 'test'

require 'rspec'
require 'rack/test'

require './backend'
require './testing_config'


describe 'Round tables REST API backend' do
    include Rack::Test::Methods

    def app
        Sinatra::Application
    end

    it "should create Licode token" do
        body = { :user => "user" }.to_json
        post '/nuve/tokens', body
        expect(last_response).to be_created
        json_response = JSON.parse(last_response.body)
        expect(json_response).to include('token')
        expect(json_response['token'].empty?).to be_falsy
    end

    it "should update table" do
        participants = ["Haim", "Moshe", "Jude"]
        put '/spaces/:space/tables/:id', participants.to_json
    end
end
