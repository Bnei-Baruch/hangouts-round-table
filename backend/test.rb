ENV['RACK_ENV'] = 'test'

require 'rspec'
require 'rack/test'

require './backend'


describe 'Round tables REST API backend' do
    include Rack::Test::Methods

    def app
        Sinatra::Application
    end

    before do
        $redis.flushdb
    end

    it "should create a Licode token" do
        body = { :user => "user" }.to_json
        post '/nuve/tokens', body
        expect(last_response).to be_created
        json_response = JSON.parse(last_response.body)
        expect(json_response).to include('token')
        expect(json_response['token'].empty?).to be_falsy
    end

    it "should update table" do
        participants = ["Haim", "Moshe", "Jude"]
        put '/spaces/fake-space/tables/fake-id', participants.to_json
        expect(last_response).to be_ok
        participants_from_db = JSON.parse($redis.get('table_fake-space_fake-id'))
        expect(participants).to eq(participants_from_db)
    end

    it "should redirect to a free table" do
        update_fake_table(1, 3)
        update_fake_table(2, 2)
        verify_free_table_id(1)

        update_fake_table(1, 3)
        update_fake_table(2, 4)
        verify_free_table_id(2)

        update_fake_table(1, 6)
        update_fake_table(2, 7)
        verify_free_table_id(1)

        update_fake_table(1, 6)
        update_fake_table(2, 4)
        verify_free_table_id(2)
    end

    it "should create a table there are no tables" do
    end

    it "should create a table if all tables are full" do
    end

    it "should redirect to a free table" do
    end

    def update_fake_table(table_id, participants_number)
        participants = ["Haim", "Moshe", "Jude", "Avi", "Moti", "Tzvika", "Oded"]
        put '/spaces/fake-space/tables/1', participants[0..participants_number].to_json
    end

    def verify_free_table_id(table_id)
        get '/spaces/fake-space/tables/free'
        expect(last_response).to be_redirect
        expect(last_response.url).to include("_/#{table_id}?")
    end
end
