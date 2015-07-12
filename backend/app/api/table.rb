class RoundTable::API
  # Update table
  put '/spaces/:space/tables/:id' do
    body = JSON.parse(request.body.read.force_encoding('UTF-8'))
    body['id'] = params[:id]
    body['space'] = params[:space]
    update_table(params[:id], params[:space], body)
  end

  def update_table(id, space, table)
    raise "Bad table id" unless not table.key?('id') or table['id'] == id
    raise "Bad table space" unless not table.key?('space') or table['space'] == space
    table['id'] = id
    table['space'] = space
    table['timestamp'] = redis.time[0]
    table_key = "table_#{space}_#{id}"
    if not table.key?('joining_participants') 
      redis_table_json = redis.get(table_key)
      if not redis_table_json.nil?
        redis_table = JSON.parse(redis_table_json.force_encoding('UTF-8'))
        table['joining_participants'] = redis_table['joining_participants']
      end
    end
    redis.set(table_key, JSON.generate(table),
              {:ex => config['table']['time_to_live']} )
  end

  # Send user to hangout to validate he approved round tables application
  get '/validate/:language' do
    bad_user_agent_url = get_bad_user_agent_url(request)
    if bad_user_agent_url
      redirect bad_user_agent_url
    else
      redirect get_hangouts_url(nil, "validate", params[:language], false, "")
    end
  end

  # Create a new table, only for moderators
  get '/spaces/:space/tables/:language/moderated' do
    redirect get_table_url(request, params[:space], params[:language],
                           params[:onair], "", true, false)
  end

  # Create a new table, only for focus group
  get '/spaces/:space/tables/:language/focus-group' do
    redirect get_table_url(request, params[:space], params[:language],
                           params[:onair], "", true, true)
  end

  # Gets existing table info
  get '/spaces/:space/tables/:language/existing' do
    table_url = get_table_url(request, params[:space], params[:language],
                      params[:onair], "", false, false)
    if table_url.nil?
      halt 204, {
        'reason' => "No tables available"
      }.to_json
    else
      halt 200, {
        'url' => table_url
      }.to_json
    end
  end

  # Get free table
  get '/spaces/:space/tables/:language/free' do
    url = get_table_url(request, params[:space], params[:language],
                        params[:onair], "", nil, false)
    redirect url
  end

  # Get fixed table
  get '/spaces/:space/tables/:language/fixed/:subspace' do
    redirect get_table_url(request, params[:space], params[:language],
                      params[:onair], params[:subspace], nil, false)
  end

  # Get space tables
  get '/spaces/:space/tables' do
    time_now = redis.time[0]
    live_tables = get_space_tables(params[:space], nil, time_now, "")
    JSON.generate(live_tables)
  end

  get '/spaces/tables' do
    time_now = redis.time[0]
    live_tables = get_space_tables("*", nil, time_now, "")
    JSON.generate(live_tables)
  end

  def get_hangouts_url(table_id, space, language, onair, subspace,
                       is_focus_group: false)
    app_data = { :space => space,
                 :language => language,
                 :onair => onair,
                 :subspace => subspace,
                 :is_focus_group => is_focus_group }.to_json
    escaped = URI.escape(app_data)

    if table_id.nil?
      table_id = ""
    end

    onair_param = if onair then "&hso=0" else "" end

    "https://plus.google.com/hangouts/_/#{table_id}?" \
    "gid=#{config['hangout_app_gid']}&gd=#{escaped}#{onair_param}"
  end

  # Search redis for space, language and subspace.
  # Check tables are live and returns array of live tables.
  def get_space_tables(space, language, time_now, subspace)
    keys = redis.keys("table_#{space}_*" )

    live_tables = []
    redis.mget(*keys).each do |one_table|
      one_table = JSON.parse(one_table.force_encoding('UTF-8'))

      if (is_table_live(one_table, time_now) and
          (language.nil? or language == one_table['language']) and
          (subspace.nil? or subspace.empty? or subspace == one_table['subspace']))
        is_focus_group = one_table['is_focus_group']
        is_focus_group = false if is_focus_group.nil?
        one_table['hangouts_url'] = get_hangouts_url(
          one_table['id'],
          one_table['space'],
          one_table['language'],
          one_table['onair'],
          one_table['subspace'],
          is_focus_group: is_focus_group
        )
        live_tables << one_table
      end
    end if not keys.empty?

    live_tables
  end

  def get_free_table(space, language, onair, subspace, is_moderator: nil, is_focus_group: nil)
    table = nil

    # If free (or subspace) and existing links (not for moderated)
    if is_moderator != true or is_focus_group == true
      time_now = redis.time[0]
      live_tables = get_space_tables(space, language, time_now, subspace)
      if is_focus_group == true
        table = choose_focus_group_table(live_tables)
      elsif subspace.nil? or subspace.empty?
        table = choose_table(live_tables)
      else
        table = choose_subspace_table(live_tables)
      end
    end

    grab_table(table, space, language, onair, subspace,
               is_moderator: is_moderator, is_focus_group: is_focus_group)
  end

  # If table was found, just return its id, otherwise
  # selects a hangout_id (table_id) out of existing set of tables.
  def grab_table(table, space, language, onair, subspace,
                 is_moderator: nil, is_focus_group: nil)
    table_id = nil
    table_id = table['id'] if not table.nil?
    if table.nil?
      if is_moderator.nil? or is_focus_group == true # Free or subspace or focus tables only.
        table = { 'participants' => [],
                  'joining_participants' => [],
                  'space' => space,
                  'language' => language,
                  'onair' => onair,
                  'subspace' => subspace,
                  'is_focus_group' => is_focus_group }
        existing_ids = get_existing_table_ids
        table_id = consts['hangout_ids'].detect do |id|
          not existing_ids.include? id
        end
      end
    end

    if (not table_id.nil? and is_moderator.nil?) or is_focus_group == true
      # Add one user to free or subspace or focus table
      time_now = redis.time[0]
      table['joining_participants'].push(time_now)
      table['id'] = table_id
      update_table(table_id, space, table)
    end

    table
  end

  def get_table_expected_participants(table)
    time_now = redis.time[0]
    table['joining_participants'].count { |timestamp|
      timestamp + 30 > time_now
    } + table['participants'].size
  end

  def choose_table(tables)
    # Choose Focus Group table if it exists and has small number of participants
    focus_group_tables = tables.select do |one_table|
      (one_table['is_focus_group'] == true and 
       get_table_expected_participants(one_table) < config['table']['min_participants_number'])
    end
    return focus_group_tables.max_by { |one_table|
      get_table_expected_participants(one_table)
    } if !focus_group_tables.empty?

    # Choose from other tables
    small_tables = tables.select do |one_table|
      get_table_expected_participants(one_table) < config['table']['min_participants_number']
    end
    return small_tables.max_by { |one_table|
      get_table_expected_participants(one_table)
    } if !small_tables.empty?
    not_full_tables = tables.select do |one_table|
      get_table_expected_participants(one_table) < config['table']['max_participants_number']
    end
    return not_full_tables.min_by { |one_table|
      get_table_expected_participants(one_table)
    } if !not_full_tables.empty?
    return nil
  end

  def choose_subspace_table(tables)
    return tables.max_by { |table|
      table['participants'].size
    }
  end

  def choose_focus_group_table(tables)
    tables.select { |table|
      is_focus_group = table['is_focus_group']
      is_focus_group = false if is_focus_group.nil?
      is_focus_group
    }.first
  end

  def is_table_live(table, time_now)
    table['timestamp'] + config['table']['polling_interval'] > time_now
  end

  def get_existing_table_ids
    keys = redis.keys("table_*_*" )
    keys.map { |key| key.split('_').last }
  end

  def get_table_url(request, space, language, onair, subspace, is_moderator, is_focus_group)
    bad_user_agent_url = get_bad_user_agent_url(request)
    if bad_user_agent_url
      return bad_user_agent_url
    end

    table = get_free_table(
      space, language, onair, subspace,
      is_moderator: is_moderator, is_focus_group: is_focus_group)
    table_id = nil
    if not table.nil?
      table_id = table['id']
      is_focus_group ||= table['is_focus_group'] if not table['is_focus_group'].nil?
    end

    if is_moderator == false and table_id.nil?
      nil
    else
      get_hangouts_url(table_id, space, language, onair, subspace,
                       is_focus_group: is_focus_group)
    end
  end

  def get_bad_user_agent_url(request)
    browser = Browser.new(:ua => request.user_agent)
    if browser.mobile? or (not browser.chrome? and not browser.firefox?)
      "#{config['bad_user_agent_url']}?from=#{request.url}"
    end
  end

end
