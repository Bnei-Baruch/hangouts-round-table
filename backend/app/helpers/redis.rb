module RoundTable::Helpers
  module DB
    @@client = nil

    def redis
      if ENV['RACK_ENV'] == 'test'
        redis_config = config['redis_test']
      else
        redis_config = config['redis']
      end

      @@client ||= Redis.new(:host => redis_config['host'],
                             :port => redis_config['port'],
                             :db => redis_config['db'])
    end
  end
end
