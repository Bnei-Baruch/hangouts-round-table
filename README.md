Hangouts Round Table
====================

App for managing round tables (google hangouts).

```bash
$ git clone https://github.com/bbfsdev/round_table.git
$ cd round_table
```

# Backend

## Redis:

```bash
$ sudo apt-get install redis
```

## Sinatra

```bash
$ cd backend
$ bundle install
$ ruby backend.rb
```

# Frontend

```bash
$ cd ../frontend
```

Install Gulp and Bower globally:

```bash
$ sudo npm install -g gulp bower
```

Install dependencies:
```bash
$ npm install
```

Create config.json, use config.json.sample as an example.
Then wire the config to the application:

```bash
$ gulp config
```

Launch local dev server:
```bash
$ gulp serve
```

It will open your default browser at the instructor page.
