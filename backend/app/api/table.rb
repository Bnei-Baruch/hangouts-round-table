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
    redis.set(table_key, JSON.generate(table),
              {:ex => config['table']['time_to_live']} )
  end

  # Get free table
  get '/spaces/:space/tables/:language/free' do
    browser = Browser.new(:ua => request.user_agent)
    if not browser.mobile? and (browser.chrome? or browser.firefox?)
      table_id = get_free_table_id(params[:space], params[:language],
                                   params[:onair])
      redirect get_hangouts_url(table_id, params[:space],
                                params[:language], params[:onair])
    else
      redirect "#{config['bad_user_agent_url']}?from=#{request.url}"
    end
  end

  get '/spaces/:space/tables' do
    time_now = redis.time[0]
    live_tables = get_space_tables(params[:space], nil, time_now)
    JSON.generate(live_tables)
  end

  get '/spaces/tables' do
    time_now = redis.time[0]
    live_tables = get_space_tables("*", nil, time_now)
    JSON.generate(live_tables)
  end

  def get_hangouts_url(table_id, space, language, onair=false)
    app_data = { :space => space, :language => language }.to_json
    escaped = URI.escape(app_data)

    if table_id.nil?
      table_id = ""
    end

    onair_param = if onair then "&hso=0" else "" end

    "https://plus.google.com/hangouts/_/#{table_id}?" \
    "gid=#{config['hangout_app_gid']}&gd=#{escaped}#{onair_param}"
  end

  def get_space_tables(space, language, time_now)
    keys = redis.keys("table_#{space}_*" )

    live_tables = []
    redis.mget(*keys).each do |one_table|
      one_table = JSON.parse(one_table.force_encoding('UTF-8'))

      if is_table_live(one_table, time_now) and (language.nil? or language == one_table['language'])
        one_table['hangouts_url'] = get_hangouts_url(
          one_table['id'],
          one_table['space'],
          one_table['language']
        )
        live_tables << one_table
      end
    end if not keys.empty?

    live_tables
  end

  def get_free_table_id(space, language, onair)
    time_now = redis.time[0]
    live_tables = get_space_tables(space, language, time_now)
    table = choose_table(live_tables, time_now)

    if not table.nil?
      table_id = table['id']
    else
      table = { 'participants' => [], 'language' => language }
      existing_ids = get_existing_table_ids
      table_id = consts['hangout_ids'].detect do |id|
        not existing_ids.include? id
      end
    end

    if not table_id.nil?
      # Add one user to table
      table['participants'].push('Unknown')
      update_table(table_id, space, table)
    end

    table_id
  end

  def choose_table(tables, time_now)
    small_tables = tables.select do |one_table|
      one_table['participants'].size < config['table']['min_participants_number']
    end
    return small_tables.max_by {
      |table| table['participants'].size
    } if !small_tables.empty?
    not_full_tables = tables.select do |one_table|
      one_table['participants'].size < config['table']['max_participants_number']
    end
    return not_full_tables.min_by {
      |table| table['participants'].size
    } if !not_full_tables.empty?
    return nil
  end

  def is_table_live(table, time_now)
    table['timestamp'] + config['table']['polling_interval'] > time_now
  end

  def get_existing_table_ids
    keys = redis.keys("table_*_*" )
    keys.map { |key| key.split('_').last }
  end
end
