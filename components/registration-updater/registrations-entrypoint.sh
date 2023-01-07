#!/bin/sh

set -e

# Prevent detected dubious ownership in repository
git config --global --add safe.directory /data/registration/repository

# Make sure repository directory exists with proper configuration.
[ ! -d "/data/registration/repository" ] \
  && echo "Creating repository directory ... " \
  && mkdir -p /data/registration/repository \
  && cd /data/registration/repository \
  && chown nodc:nodc . \
  && chmod g+s .

# Execute initial check.
/opt/registrations-update.sh

# This is code based on php:7.4.30-apache-buster/docker-php-entrypoint
apache2-foreground
