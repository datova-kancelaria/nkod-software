#!/bin/sh

# Make sure repository directory exists with proper configuration.
[ ! -d "/data/registration" ] \
  && mkdir -p /data/registration \
  && chown nodc:nodc /data/registration \
  && chmod g+s /data/registration

# Execute initial check.
/opt/registrations-update.sh

# This is code from php:7.4.30-apache-buster/docker-php-entrypoint
set -e

# First arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
  set -- apache2-foreground "$@"
fi

exec "$@"
