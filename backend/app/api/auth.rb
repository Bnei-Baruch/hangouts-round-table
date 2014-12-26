class RoundTable::API
  get '/auth/basic' do
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)

    if @auth.provided? and @auth.basic? and @auth.credentials
      user, password = *@auth.credentials
      user_json = redis.get("auth_user_#{user}")

      if user_json.nil?
        not_authorized
      else
        user = JSON.parse(user_json)

        if BCrypt::Password.new(user['password']) == password
          halt 201, {
            :token => create_auth_token,
            :space => user['space']
          }.to_json
        else
          not_authorized
        end
      end
    else
      not_authorized
    end
  end

  # Create auth token
  post '/auth/tokens' do
    body = JSON.parse(request.body.read)
    user_json = redis.get("auth_user_#{body['user']}")

    if user_json.nil?
      response_auth_error
    else
      user = JSON.parse(user_json)

      if BCrypt::Password.new(user['password']) == body['password']
        status 201
        {
          :token => create_auth_token,
          :space => user['space']
        }.to_json
      else
        response_auth_error
      end
    end
  end

  def create_auth_token
    token = SecureRandom.urlsafe_base64
    key = "auth_session_#{token}"
    redis.set(key, true)
    redis.expire(key, config['auth']['session_ttl'])
    token
  end

  def not_authorized
    headers 'WWW-Authenticate' => 'Basic realm="Restricted Area"'
    halt 401, { "error" => "Not authorized" }.to_json
  end

end
