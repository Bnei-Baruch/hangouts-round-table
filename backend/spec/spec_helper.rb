ENV['RACK_ENV'] = 'test'

require 'simplecov'
SimpleCov.start

require 'rubygems'
require 'bundler'
Bundler.setup :default, :test

require 'rack/test'
require 'pry'
require 'json'

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.color = true
  config.tty = true
end

require_relative '../app/main'

describe RoundTable::API do
end
