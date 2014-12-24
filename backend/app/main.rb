require 'sinatra'
require 'json'
require 'redis'

require './config/config'

if ENV['RACK_ENV'] == 'test'
  require './config/testing_config'
end


module RoundTable; end

class RoundTable::API < Sinatra::Application
  @@redis = nil

  before do
    headers_list = {
      'Access-Control-Allow-Origin' => '*', 
      'Access-Control-Allow-Methods' => 'OPTIONS,GET,POST,PUT',
      'Access-Control-Allow-Headers' =>
      'Origin,X-Requested-With,Content-Type,Accept'
    }
    headers headers_list
  end

  configure do
    set :json_content_type, :js,
      :server => 'thin',
      :sockets => [],
      :bind => '0.0.0.0',
      :protection => false

    redis_config = CONFIG['redis']
    set :redis => Redis.new(redis_config['host'] => "localhost",
                            :port => redis_config['port'],
                            :db => redis_config['db'])
  end

  use Rack::Deflater

  options '/*' do
    200
  end
end

require_relative 'table'
require_relative 'auth'
