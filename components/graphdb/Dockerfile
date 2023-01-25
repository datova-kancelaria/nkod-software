# FROM ontotext/graphdb:9.11.2-se
# https://hub.docker.com/r/ontotext/graphdb/

FROM debian:bookworm-20220527
ARG GRAPHDB_URL="./graphdb-free-10.0.0-dist.zip"

RUN apt-get update \
    && apt-get -y --no-install-recommends install openjdk-17-jdk unzip apache2-utils

ADD ${GRAPHDB_URL} /tmp

WORKDIR /opt/graphdb
RUN unzip /tmp/graphdb-*.zip \
    && rm /tmp/graphdb-*.zip \
    && mv ./graphdb-* ./dist \
    && mkdir -p ./home 

COPY ./conf /opt/graphdb/home/conf
COPY ./configs /opt/graphdb/home/configs
COPY ./work /opt/graphdb/home/work
COPY ./repositories /opt/graphdb/home/repositories

ENV PATH=/opt/graphdb/dist/bin:$PATH

RUN addgroup --gid 5987 "nodc" \
    && useradd --gid "nodc" --uid 5987 "nodc"
RUN chown -R nodc:nodc /opt/graphdb/

WORKDIR /opt/

COPY ./entrypoint.sh ./
RUN chmod u+x entrypoint.sh \
    && chown nodc:nodc entrypoint.sh

ENV GRAPHDB_ADMIN_PASSWORD="admin"
ENV GRAPHDB_USER="user"
ENV GRAPHDB_PASSWORD="user"
ENV GRAPHDB_EXTERNAL_URL=""
ENV GRAPHDB_DISTINCT_THRESHOLD="128m"

USER nodc

CMD ["/opt/entrypoint.sh"]

EXPOSE 7200
