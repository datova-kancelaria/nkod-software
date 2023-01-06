#!/bin/bash

set -e

echo "New run started: $(date)" 
cd /data/registration/repository

# Clone if the direcotry is empty.
[ ! -d ".git" ] \
  && echo "Clone repository $WEBHOOK_REPOSITORY" \
  && git clone $WEBHOOK_REPOSITORY ./

echo "Update data"
git fetch --all
git reset --hard HEAD
git pull
