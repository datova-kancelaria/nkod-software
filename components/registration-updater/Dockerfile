FROM php:7.4.30-apache-buster

RUN apt-get update \
 && apt-get -y --no-install-recommends install git

RUN addgroup --gid 5987 "nodc" \
    && useradd --gid 5987 --uid 5987 -m "nodc" \
    && usermod -a -G nodc www-data

COPY ./www/webhook.php /var/www/html/

COPY ./registrations-update.sh /opt/
RUN chown 5987:5987 /opt/registrations-update.sh \ 
    && chmod u+xs /opt/registrations-update.sh \
    && chmod a+x /opt/registrations-update.sh

COPY ./registrations-entrypoint.sh /opt/
RUN chown 5987:5987 /opt/registrations-entrypoint.sh \ 
    && chmod u+xs /opt/registrations-entrypoint.sh \
    && chmod a+x /opt/registrations-entrypoint.sh

# The output must be redirected to file or another output stream. This allows
# PHP to execute the command in background.
# See https://www.php.net/manual/en/function.exec.php
ENV WEBHOOK_CMD="/opt/registrations-update.sh > /dev/null &"
ENV WEBHOOK_TOKEN=""
ENV WEBHOOK_REF=""
ENV WEBHOOK_REPOSITORY=""
ENV WEBHOOK_REPOSITORY_NAME=""

ENTRYPOINT /opt/registrations-entrypoint.sh

EXPOSE 80
