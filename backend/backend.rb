require 'sinatra'
require 'json'
require 'redis'

require './config'
require './nuve'


set :bind, '0.0.0.0'

# Initializing Nuve API
nuve = Nuve.new $licode_conf[:service], $licode_conf[:key], $licode_conf[:url]

# Getting a room
rooms_json = nuve.getRooms()

rooms = JSON.parse(rooms_json)
room = rooms.find { |item| item['name'] == $licode_conf[:new_room_name] }

if room.nil?
    room_json = nuve.createRoom($licode_conf[:new_room_name])
    room = JSON.parse(room_json)
end

redis = Redis.new($redis_conf[:host] => "localhost", :port => $redis_conf[:db], :db => $redis_conf[:db])

# Create Nuve token
post '/nuve/tokens' do
    content_type :json
    token = nuve.createToken(room['_id'], params[:user], 'participant')
    { :token => token }.to_json
    status 201
end


# Get free table
get '/spaces/:space/tables/free' do
    table_id = get_free_table_id(params[:space])
    hangouts_url = "https://plus.google.com/hangouts/_/#{table_id}?gid=#{$hangout_conf[:hangout_app_gid]}&gd=#{params[:space]}";
    { :hangouts_url => hangouts_url }.to_json
end

def get_free_table_id(space)
    keys = redis.keys("table_#{space}_*")
    time_now = redis.time
    redis.mget(keys).each 
end
