require 'sinatra'
require 'json'
require 'redis'

require './config/config'

if ENV['RACK_ENV'] == 'test'
    require './config/testing_config'
end

require './nuve'


set :json_content_type, :js
set :bind, '0.0.0.0'

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

# Create Nuve token
post '/nuve/tokens' do
    content_type :json

    request.body.rewind
    data = JSON.parse request.body.read

    user = data.fetch('user', 'participant')
    role = data.fetch('role', 'partticipant')
    token = nuve.createToken(room['_id'], user, role)

    status 201

    { :token => token }.to_json
end


# Update table
put '/spaces/:space/tables/:id' do
    request.body.rewind
    $redis.set("table_#{params[:space]}_#{params[:id]}", request.body.read)
end


# Get free table
get '/spaces/:space/tables/free' do
    table_id = get_free_table_id(params[:space])
    hangouts_url = "https://plus.google.com/hangouts/_/#{table_id}?gid=#{CONFIG['hangout_app_gid']}&gd=#{params[:space]}";
    redirect hangouts_url
end

table_config = CONFIG['table']

def get_free_table_id(space)
    keys = $redis.keys("table_#{space}_*")
    time_now = $redis.time

    live_tables = []
    puts "#{keys} keys"
    $redis.mget(*keys).each do |one_table|
        if one_table.timestamp + table_config['time_to_live'] < time_now
            $redis.del("table_#{space}_#{one_table.id}")
        else
            if is_table_live(one_table, time_now)
                live_tables << one_table
            end
        end
    end

    choose_table(live_tables, time_now)
end

def choose_table(tables, time_now)
    small_tables = tables.select do |one_table|
        one_table.participants.size < table_config['min_participants_number']
    end
    if small_tables
        return small_tables.min_by { |table| table.participants.size } 
    end
    return tables.max_by { |table| table.participants.size }
end

def is_table_live(table, time_now)
    table.timestamp + table_config['polling_interval'] > time_now
end
