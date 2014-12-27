class RoundTable::API
  post '/auth/tokens' do
    body = JSON.parse(request.body.read)
    user_json = redis.get("auth_user_#{body['login']}")

    if user_json.nil?
      response_auth_error
    else
      user = JSON.parse(user_json)

      if BCrypt::Password.new(user['password']) == body['password']
        halt 201, {
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

  def response_auth_error
    halt 400, { :error => "Invalid user name or password" }
  end

end
