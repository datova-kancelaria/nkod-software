# FROM ontotext/graphdb:9.11.2-se
# https://hub.docker.com/r/ontotext/graphdb/

FROM debian:bookworm-20220527
ENV GRAPHDB_URL="./graphdb-free-9.11.1-dist.zip"

RUN apt-get update \
 && apt-get -y --no-install-recommends install openjdk-17-jdk unzip

ADD ${GRAPHDB_URL} /tmp

WORKDIR /opt/graphdb
RUN unzip /tmp/graphdb-*.zip && \
    rm /tmp/graphdb-*.zip && \
    mv ./graphdb-* ./dist && \
    mkdir -p ./home

ENV PATH=/opt/graphdb/dist/bin:$PATH

ENTRYPOINT ["/opt/graphdb/dist/bin/graphdb", "-Dgraphdb.home=/opt/graphdb/home"]

EXPOSE 7200
