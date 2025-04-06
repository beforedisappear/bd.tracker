FROM postgres:12

ENV POSTGRES_LISTEN_ADDRESSES='*'

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib

ADD *.sql /docker-entrypoint-initdb.d/
