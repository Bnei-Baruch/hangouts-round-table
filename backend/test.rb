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
        test_table = {
            "id" => "fake-id",
            "lang" => "en",
            "space" => "fake-space",
            "participants" => ["Haim", "Moshe", "Jude"],
        }
        put '/spaces/fake-space/tables/fake-id', JSON.generate(test_table)
        expect(last_response).to be_ok
        table_test_from_db = JSON.parse($redis.get('table_fake-space_fake-id'))
        # 1416028759 - Sat, 15 Nov 2014 05:19:19 GMT
        expect(table_test_from_db['timestamp']).to be > 1416028759
        table_test_from_db.delete('timestamp')
        expect(test_table).to eq(table_test_from_db)
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
        test_table = {
            "id" => table_id.to_s,
            "lang" => "en",
            "space" => "fake-space",
            "participants" => ["Haim", "Moshe", "Jude", "Avi", "Moti", "Tzvika", "Oded"],
        }
        test_table['participants'] = test_table['participants'][0..participants_number-1]
        put "/spaces/fake-space/tables/#{table_id}", JSON.generate(test_table)
    end

    def verify_free_table_id(table_id)
        get '/spaces/fake-space/tables/free'
        expect(last_response).to be_redirect
        expect(last_response.location).to include("_/#{table_id}?")
    end
end
