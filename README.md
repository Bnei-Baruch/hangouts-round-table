Hangouts Round Table
====================

An app for managing round tables based on Google Hangouts.

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
$ rake
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
