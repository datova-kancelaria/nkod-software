FROM debian:buster-slim

RUN apt-get update \
 && apt-get -y --no-install-recommends install git curl ca-certificates

RUN addgroup --gid 5987 "nodc" \
    && useradd --gid "nodc" --uid 5987 "nodc"

WORKDIR /opt/scheduler
COPY ./update-and-run-pipeline.sh ./

RUN chmod +x ./update-and-run-pipeline.sh \
    && chown nodc:nodc ./

USER nodc

ENV STORAGE_REPOSITORY
ENV RELOAD_URL
ENV EXECUTE_PIPELINE_URL

CMD ["/opt/scheduler/update-and-run-pipeline.sh"]
