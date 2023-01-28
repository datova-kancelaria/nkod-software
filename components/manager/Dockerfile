FROM debian:buster-slim

RUN apt-get update \
 && apt-get -y --no-install-recommends install git curl ca-certificates

RUN addgroup --gid 5987 "nodc" \
    && useradd -m --gid "nodc" --uid 5987 "nodc"

WORKDIR /opt/manager
COPY ./entrypoint.sh ./

RUN chmod +x ./entrypoint.sh \
    && chown nodc:nodc ./

USER nodc

ENV STORAGE_REPOSITORY=""
ENV STORAGE_RELOAD_URL=""
ENV FRONTEND_URL=""
ENV PIPELINE_URL=""
ENV PIPELINE_REPOSITORY=""

CMD ["/opt/manager/entrypoint.sh"]
