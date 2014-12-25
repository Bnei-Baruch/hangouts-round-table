ENV['RACK_ENV'] = 'test'

require 'simplecov'
SimpleCov.start

require 'rubygems'
require 'bundler'
Bundler.setup :default, :test

require 'rack/test'
require 'pry'
require 'json'
require 'yaml'

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.color = true
  config.tty = true
end

require_relative '../app/main'

def app; RoundTable::API.new; end
def redis; app.helpers.redis; end
