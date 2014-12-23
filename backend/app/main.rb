require 'sinatra'
require 'json'
require 'redis'

require './config/config'

if ENV['RACK_ENV'] == 'test'
  require './config/testing_config'
end

before do
  headers_list = {
    'Access-Control-Allow-Origin' => '*', 
    'Access-Control-Allow-Methods' => 'OPTIONS,GET,POST,PUT',
    'Access-Control-Allow-Headers' =>
    'Origin,X-Requested-With,Content-Type,Accept'
  }
  headers headers_list
end

redis_config = CONFIG['redis']
$redis = Redis.new(redis_config['host'] => "localhost",
                   :port => redis_config['port'],
                   :db => redis_config['db'])

module RoundTable
  class App < Sinatra::Application
    configure do
      set :json_content_type, :js,
        :server => 'thin',
        :sockets => [],
        :bind => '0.0.0.0',
        :protection => false
    end

    use Rack::Deflater

    options '/*' do
      200
    end
  end
end
