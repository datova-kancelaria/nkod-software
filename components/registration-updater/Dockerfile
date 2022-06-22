FROM php:7.4.30-apache-buster

RUN apt-get update \
 && apt-get -y --no-install-recommends install git

RUN addgroup --gid 5987 "nodc" \
    && usermod -a -G nodc www-data

COPY ./www/webhook.php /var/www/html/
COPY ./update-registrations.sh /opt/

RUN chown 5987:5987 /opt/update-registrations.sh \ 
    && chmod u+xs /opt/update-registrations.sh \
    && chmod a+x /opt/update-registrations.sh

# The output must be redirected to file or another output stream. This allows
# PHP to execute the command in background.
# See https://www.php.net/manual/en/function.exec.php
ENV WEBHOOK_CMD="/opt/update-registrations.sh > /dev/null &"
ENV WEBHOOK_TOKEN=""
ENV WEBHOOK_BRANCH="main"
ENV WEBHOOK_REPOSITORY=""

EXPOSE 80
