#!/bin/bash

# Make sure directory exist with the right settings.
[ ! -d "/data/registration" ] && mkdir -p /data/registration && chwon nodc:ndoc /data/registration && chmod g+s /data/registration

# Update the content.
cd /data/registration
[ ! -d ".git" ] && git clone $WEBHOOK_REPOSITORY ./
git fetch --all
git reset --hard HEAD
git pull
