require_relative '../spec_helper'


describe RoundTable::API do
  before do
    redis.flushdb

    fake_consts = {
      'hangout_ids' => [
        'pre-generated-id-1',
        'pre-generated-id-2',
      ]
    }
    RoundTable::API.any_instance.stub(:consts).and_return(fake_consts)
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

  it "should add new table id to constants table list" do
    # TODO: Make sure that if generated hangout id is not in the constans
    # we add it to existing constants ids (maybe also update the local file?!).
    # expect(false).to be(true)
    # Not implemented yet
  end

  it "should redirect to bad user agent page" do
    get("/spaces/fake-space/tables/en/free",
        {}, { 'HTTP_USER_AGENT' => 'FakeUserAgent/1.0' })
    expect(last_response).to be_redirect
    expect(last_response.location).to start_with(config['bad_user_agent_url'])
  end

  it "should create a new pre-generated table if all tables are full" do
    update_fake_table("some-id-1", 9)
    update_fake_table("some-id-2", 10)
    verify_free_table_id("some-id-1")

    update_fake_table("some-id-1", 10)
    update_fake_table("some-id-2", 10)
    verify_free_table_id("pre-generated-id-1")
  end

  it "should create a new second existing table if all tables are full" do
    update_fake_table("pre-generated-id-1", 10)
    update_fake_table("some-id-1", 10)
    verify_free_table_id('pre-generated-id-2')
  end

  it "should create a new non-existing table if all tables are full" do
    update_fake_table("pre-generated-id-1", 10)
    update_fake_table("pre-generated-id-2", 10)
    verify_free_table_id('')
  end

  it "should not choose same table id when accessing different spaces" do
    verify_free_table_id('pre-generated-id-1', space: "one")
    verify_free_table_id('pre-generated-id-1', space: "one")
    expect(get_table('pre-generated-id-1', 'one')['participants'].length).to be(2)
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    expect(get_table('pre-generated-id-2', 'two')['participants'].length).to be(2)
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    verify_free_table_id('pre-generated-id-2', space: "two")
    expect(get_table('pre-generated-id-2', 'two')['participants'].length).to be(10)
    verify_free_table_id('', space: "two")
    verify_free_table_id('', space: "three")
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
    verify_free_table_id(1, language: 'en')
    verify_free_table_id(3, language: 'he')
  end

  it "should create a table with onair param" do
    table_url = get_free_table_url(url_params: { :onair => "yes" })
    expect(table_url).to include("&hso=0")
  end

  it "should redirect to a different table for subspace" do
    verify_free_table_id('pre-generated-id-1', space: "one", subspace: "1")
    verify_free_table_id('pre-generated-id-2', space: "one", subspace: "2")
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
    participants = ["Haim", "Moshe", "Jude", "Avi", "Moti", "Tzvika", "Oded",
                    "Valik", "Misha", "Igor"]
    test_table = {
      "id" => table_id.to_s,
      "language" => language,
      "space" => space,
    }
    test_table['participants'] = participants[0..participants_number-1]
    put "/spaces/#{space}/tables/#{table_id}", JSON.generate(test_table)
  end

  def verify_free_table_id(table_id, language: "fake-language",
                           space: "fake-space", subspace: "")
    table_url = get_free_table_url(language: language, space: space, subspace: subspace)
    expect(table_url).to include("_/#{table_id}?")
  end

  def get_table(id, space)
    JSON.parse(redis.get("table_#{space}_#{id}"))
  end

  def get_free_table_url(language: "fake-language", space: "fake-space",
                         url_params: {}, subspace: "")
    query = Rack::Utils.build_query(url_params)
    if subspace.empty?
      get("/spaces/#{space}/tables/#{language}/free?#{query}",
          {}, { 'HTTP_USER_AGENT' => 'Chrome/39.0.2171.99' })
    else
      get("/spaces/#{space}/tables/#{language}/fixed/#{subspace}?#{query}",
          {}, { 'HTTP_USER_AGENT' => 'Chrome/39.0.2171.99' })
    end
    expect(last_response).to be_redirect
    last_response.location
  end

end
