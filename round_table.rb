# myapp.rb
require 'sinatra'

get '/' do
  'Hello world!'
end

get '/test_page' do
  <<-eos
<html>
<head>
  <!-- load JQuery -->
  <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

  <script type="text/javascript">
    $(document).ready(function() {
      function set() {
        $.ajax({
          url: "http://127.0.0.1:7379/SET/value/" + $("#set_box")[0].value,
          data: "format=json",
          dataType: "json",
          success: function(data)
          {
            $("#webdis").append("<div>" + JSON.stringify(data) + "</div>");
          }
        });
      }

      function get() {
        $.ajax({
          url: "http://127.0.0.1:7379/GET/value",
          data: "format=json",
          dataType: "json",
          success: function(data)
          {
            $("#webdis").append("<div>" + JSON.stringify(data) + "</div>");
          }
        });
      }

      $("#set_button").click(set);
      $("#get_button").click(get);
    });
  </script>
</head>
<body>

<button id="set_button">SET</button><input id="set_box" type="text"/><br>
<button id="get_button">GET</button>

<div id="webdis"><div>

<a href="https://plus.google.com/hangouts/_?gid=486366694302" style="text-decoration:none;">
  <img src="https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-20x86-normal.png"
    alt="Start a Hangout"
    style="border:0;width:86px;height:20px;"/>
</a>
</body>
</html>
  eos
end
