# FROM ontotext/graphdb:9.11.2-se
# https://hub.docker.com/r/ontotext/graphdb/

FROM debian:bookworm-20220527
ARG GRAPHDB_URL="./graphdb-free-10.0.0-dist.zip"

RUN apt-get update \
 && apt-get -y --no-install-recommends install openjdk-17-jdk unzip apache2-utils

ADD ${GRAPHDB_URL} /tmp

WORKDIR /opt/graphdb
RUN unzip /tmp/graphdb-*.zip && \
    rm /tmp/graphdb-*.zip && \
    mv ./graphdb-* ./dist && \
    mkdir -p ./home 

COPY ./conf /opt/graphdb/home/conf
COPY ./configs /opt/graphdb/home/configs
COPY ./work /opt/graphdb/home/work
COPY ./repositories /opt/graphdb/home/repositories

ENV PATH=/opt/graphdb/dist/bin:$PATH

WORKDIR /opt/

COPY ./entrypoint.sh ./
RUN chmod u+x entrypoint.sh

# Single quotes to prevent substitution, also you have to change this.
ENV GRAPHDB_ADMIN_PASSWORD 'admin'
ENV GRAPHDB_USER lp-etl 
ENV GRAPHDB_PASSWORD 'lp-etl'
ENV GRAPHDB_DISTINCT_THRESHOLD 128m

CMD ["/opt/entrypoint.sh"]

EXPOSE 7200
