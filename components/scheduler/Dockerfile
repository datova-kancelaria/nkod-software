FROM debian:buster-slim

RUN apt-get update \
 && apt-get -y --no-install-recommends install git curl

WORKDIR /opt/scheduler
COPY ./update-and-run-pipeline.sh ./

ENTRYPOINT ["/opt/scheduler/update-and-run-pipeline.sh"]
