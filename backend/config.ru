require File.dirname(__FILE__) + "/app/main.rb"

if ENV['RACK_ENV'].eql? :production
  use Rack::Deflater   # gzip compression
end

map '/' do
  run RoundTable::API
end
