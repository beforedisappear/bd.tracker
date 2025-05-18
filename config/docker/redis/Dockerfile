# Pull base image.
FROM ubuntu:latest


RUN apt-get clean && apt-get update && \
  apt-get install -y wget build-essential tcl

# Install Redis.
RUN \
  cd /tmp && \
  wget https://download.redis.io/redis-stable.tar.gz && \
  tar xvzf redis-stable.tar.gz && \
  cd redis-stable && \
  make && \
  make install && \
  cp -f src/redis-sentinel /usr/local/bin && \
  mkdir -p /etc/redis && \
  cp -f *.conf /etc/redis && \
  rm -rf /tmp/redis-stable* && \
  sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
  sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Define default command.
# CMD ["redis-server", "/etc/redis/redis.conf"]
CMD ["redis-server", "/etc/redis/redis.conf", "--protected-mode", "no"]

# Expose ports.
EXPOSE 6379