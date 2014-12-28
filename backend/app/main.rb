require 'rubygems'
require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'] || :development)

module RoundTable; end

require_relative 'helpers/config'
require_relative 'helpers/redis'

class RoundTable::API < Sinatra::Base
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
  end

  options '/*' do
    200
  end

  helpers RoundTable::Helpers::Config
  helpers RoundTable::Helpers::DB
  helpers RoundTable::Helpers
end

require_relative 'api/table'
require_relative 'api/auth'
require_relative 'api/signaling'
