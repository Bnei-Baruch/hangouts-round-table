module RoundTable::Helpers
  module Redis
    @@client = nil

    def redis
      @@client ||= Redis.new(:host => config[:redis][:host],
                             :port => config[:redis][:port],
                             :db => config[:redis][:db])
    end
  end
end

