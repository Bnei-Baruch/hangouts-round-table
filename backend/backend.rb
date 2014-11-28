require 'sinatra'
require 'json'
require 'redis'

require './config/config'

if ENV['RACK_ENV'] == 'test'
    require './config/testing_config'
end

require './nuve'


before do
    headers 'Access-Control-Allow-Origin' => '*', 
        'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST', 'PUT'],
        'Access-Control-Allow-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
end


set :json_content_type, :js
set :bind, '0.0.0.0'
set :protection, false

# Initializing Nuve API
licode_config = CONFIG['licode']
nuve = Nuve.new licode_config['service'], licode_config['key'], licode_config['url']

# Getting a room
rooms_json = nuve.getRooms()

rooms = JSON.parse(rooms_json)
room = rooms.find { |item| item['name'] == licode_config['new_room_name'] }

if room.nil?
    room_json = nuve.createRoom(licode_config['new_room_name'])
    room = JSON.parse(room_json)
end

redis_config = CONFIG['redis']
$redis = Redis.new(redis_config['host'] => "localhost", :port => redis_config['port'], :db => redis_config['db'])

options '/nuve/tokens' do
    200
end

# Create Nuve token
post '/nuve/tokens' do
    content_type :json

    request.body.rewind
    data = JSON.parse request.body.read

    user = data.fetch('user', 'participant')
    role = data.fetch('role', 'participant')
    token = nuve.createToken(room['_id'], user, role)

    status 201

    { :token => token }.to_json
end

# Update table
options '/spaces/:space/tables/:id' do
    200
end

put '/spaces/:space/tables/:id' do
    request.body.rewind
    body = JSON.parse(request.body.read)
    body['timestamp'] = $redis.time[0]
    $redis.set("table_#{params[:space]}_#{params[:id]}", JSON.generate(body))
end

options '/spaces/:space/tables/:language/free' do
    200
end

# Get free table
get '/spaces/:space/tables/:language/free' do
    table_id = get_free_table_id(params[:space], params[:language])
    if table_id.nil?
      table_id = ""
    end

    redirect get_hangouts_url(table_id, params[:space], params[:language])
end

$table_config = CONFIG['table']

def get_hangouts_url(table_id, space, language)
    app_data = { :space => space, :language => language }.to_json
    escaped = URI.escape(app_data)
    "https://plus.google.com/hangouts/_/#{table_id}?gid=#{CONFIG['hangout_app_gid']}&gd=#{escaped}"
end

def get_space_tables(space, language, time_now)
    keys = $redis.keys("table_#{space}_*" )

    live_tables = []
    $redis.mget(*keys).each do |one_table|
        puts one_table
        one_table = JSON.parse(one_table)
        if one_table['timestamp'] + $table_config['time_to_live'] < time_now
            table_id = "table_#{one_table['space']}_#{one_table['id']}"
            puts "Deleting old tables #{table_id}"
            $redis.del(table_id)
        else
            if is_table_live(one_table, time_now) and (language.nil? or language == one_table['lang'])
                one_table['hangouts_url'] = get_hangouts_url(one_table['id'],
                                                             one_table['space'],
                                                             one_table['lang'])
                live_tables << one_table
            end
        end
    end if not keys.empty?
    live_tables
end

def get_free_table_id(space, language)
    time_now = $redis.time[0]
    live_tables = get_space_tables(space, language, time_now)
    table = choose_table(live_tables, time_now)
    return table['id'] if table
    nil
end

def choose_table(tables, time_now)
    small_tables = tables.select do |one_table|
        one_table['participants'].size < $table_config['min_participants_number']
    end
    puts small_tables
    return small_tables.max_by { |table| table['participants'].size } if !small_tables.empty?
    not_full_tables = tables.select do |one_table|
      one_table['participants'].size < $table_config['max_participants_number']
    end
    puts not_full_tables
    return not_full_tables.min_by { |table| table['participants'].size } if !not_full_tables.empty?
    return nil
end

def is_table_live(table, time_now)
    table['timestamp'] + $table_config['polling_interval'] > time_now
end

options '/spaces/:space/tables' do
    200
end

get '/spaces/:space/tables' do
    time_now = $redis.time[0]
    live_tables = get_space_tables(params[:space], nil, time_now)
    JSON.generate(live_tables)
end

options '/spaces/tables' do
    200
end

get '/spaces/tables' do
    time_now = $redis.time[0]
    live_tables = get_space_tables("*", nil, time_now)
    JSON.generate(live_tables)
end
