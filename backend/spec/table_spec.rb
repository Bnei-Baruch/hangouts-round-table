require 'bcrypt'

require_relative 'spec_helper'


describe RoundTable::API do
  def app; RoundTable::API.new; end
  def redis; app.helpers.redis; end

  before do
    redis.flushdb
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
    table_test_from_db = JSON.parse(redis.get('table_fake-space_fake-id'))
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

  it "should redirect to a free table for selected language" do
    update_fake_table(1, 3, language: 'en')
    update_fake_table(2, 2, language: 'en')
    update_fake_table(3, 3, language: 'he')
    update_fake_table(4, 2, language: 'he')
    verify_free_table_id(1, 'en')
    verify_free_table_id(3, 'he')
  end

  it "should create a table there are no tables" do
    verify_free_table_id("")
  end

  it "should create a table if all tables are full" do
    update_fake_table(1, 10)
    update_fake_table(2, 10)
    verify_free_table_id("")
  end

  it "should create a table with onair param" do
    table_url = get_free_table_url(url_params: { :onair => "yes" })
    expect(table_url).to include("&hso=0")
  end

  it "should return space tables" do
    update_fake_table(1, 5, space: "space1")
    update_fake_table(2, 6, space: "space2")
    update_fake_table(3, 7, space: "space1")
    get "/spaces/space1/tables"
    tables = JSON.parse(last_response.body)
    expect(tables.size).to be 2
    expect(tables.map { |table| table['id'] }.sort!).to eq(["1", "3"])
  end

  it "should return all tables" do
    update_fake_table(1, 5, space: "space1")
    update_fake_table(2, 6, space: "space2")
    update_fake_table(3, 7, space: "space1")
    get "/spaces/tables"
    tables = JSON.parse(last_response.body)
    expect(tables.size).to be 3
    expect(tables.map { |table| table['id'] }.sort!).to eq(["1", "2", "3"])
  end

  def update_fake_table(table_id, participants_number, space: "fake-space", language: "fake-language")
    test_table = {
      "id" => table_id.to_s,
      "language" => language,
      "space" => space,
      "participants" => ["Haim", "Moshe", "Jude", "Avi", "Moti", "Tzvika", "Oded", "Valik", "Misha", "Igor"],
    }
    test_table['participants'] = test_table['participants'][0..participants_number-1]
    put "/spaces/#{space}/tables/#{table_id}", JSON.generate(test_table)
  end

  def verify_free_table_id(table_id, language="fake-language")
    table_url = get_free_table_url(language)
    expect(table_url).to include("_/#{table_id}?")
  end

  def get_free_table_url(language="fake-language", url_params: {})
    query = Rack::Utils.build_query(url_params)
    get "/spaces/fake-space/tables/#{language}/free?#{query}"
    expect(last_response).to be_redirect
    last_response.location
  end

end
