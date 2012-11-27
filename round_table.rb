# myapp.rb
require 'sinatra'

get '/' do
  'Hello world!'
end

get '/test_page' do
  <<-eos
<html>
<body>
<a href="https://plus.google.com/hangouts/_?gid=486366694302" style="text-decoration:none;">
  <img src="https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-20x86-normal.png"
    alt="Start a Hangout"
    style="border:0;width:86px;height:20px;"/>
</a>
</body>
</html>
  eos
end
