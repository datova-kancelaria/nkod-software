#!/bin/sh
# This can be first time we run this script, we make sure repository is ready.
exec "/opt/registrations-update.sh"

# This is code from php:7.4.30-apache-buster/docker-php-entrypoint
set -e

# First arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
  set -- apache2-foreground "$@"
fi

exec "$@"
