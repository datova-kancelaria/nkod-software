#!/bin/bash
echo "Updating repository"
id -u

mkdir -p /data/registration

cd /data/registration
[ ! -d ".git" ] && git clone $WEBHOOK_REPOSITORY ./
git fetch --all
git reset --hard HEAD
git pull
