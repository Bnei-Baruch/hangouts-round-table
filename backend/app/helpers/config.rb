require 'yaml'

module RoundTable::Helpers
  module Config
    CONFIG_FILE = "./config.yaml"
    @@data = nil

    def config
      @@data ||= YAML.load(File.open(CONFIG_FILE))
    end
  end
end
