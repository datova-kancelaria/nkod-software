#!/bin/bash
mkdir -p /data/registration
cd /data/registration
[ ! -d ".git" ] && git clone $WEBHOOK_REPOSITORY ./
git fetch --all
git reset --hard $WEBHOOK_BRANCH
