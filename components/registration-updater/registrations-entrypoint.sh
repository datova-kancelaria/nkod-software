#!/bin/sh

# Make sure repository directory exists with proper configuration.
[ ! -d "/data/registration" ] \
  && mkdir -p /data/registration \
  && chown nodc:nodc /data/registration \
  && chmod g+s /data/registration

# Execute initial check.
/opt/registrations-update.sh

# This is code based on php:7.4.30-apache-buster/docker-php-entrypoint
set -e
apache2-foreground
