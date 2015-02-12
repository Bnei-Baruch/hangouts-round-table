module RoundTable::Helpers
  module Yaml
    @@data = {}

    def config
      load_yaml "./config.yaml"
    end

    def consts
      load_yaml "./consts.yaml"
    end

    def load_yaml(file_name)
      @@data[file_name] ||= YAML.load(File.open(file_name))
    end
  end
end
