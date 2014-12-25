class RoundTable::API
  # Create auth token
  post '/auth/tokens' do
    body = JSON.parse(request.body.read)
    user_json = settings.redis.get("auth_user_#{body['user']}")

    auth_error = { :error => "Invalid user name or password" }
    bad_request_response = [400, [auth_error.to_json]]

    if user_json.nil?
      bad_request_response
    else
      user = JSON.parse(user_json)

      if BCrypt::Password.new(user['password']) == body['password']
        token = SecureRandom.urlsafe_base64
        key = "auth_session_#{token}"
        settings.redis.set(key, true)
        settings.redis.expire(key, CONFIG['auth']['session_ttl'])

        status 201
        {
          :token => token,
          :space => user['space']
        }.to_json
      else
        bad_request_response
      end
    end
  end
end
