round_table
===========

App for managing round tables (google hangouts).

First step is to write embeddable html button which opens google hangout (round table).
The google hangout app will send data to round_table server.
This way when another person presses the button will send it to already existing hangout.

Second step is to divide uses by language (let them select).
Third step, write embeddable html table with data about all users and all round tables.

Installing:

# Install redis
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make-test
make

sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/

#Install webdis (Redis with http/json interface)

# Prerequesites
sudo apt-get install libevent-dev
sudo brew install libevent (on MacOS)

wget http://download.redis.io/redis-stable.tar.gz
cd webdis/
make

# Run webdis ().
./webdis &

# Test it works.
curl http://127.0.0.1:7379/SET/hello/world
→ {"SET":[true,"OK"]}

curl http://127.0.0.1:7379/GET/hello
→ {"GET":"world"}

curl -d "GET/hello" http://127.0.0.1:7379/
→ {"GET":"world"}

# Install nginx
...


# Configure and Run nginx
...
