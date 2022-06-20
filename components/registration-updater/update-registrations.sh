#!/bin/bash
mkdir -p /data
cd /data
[ ! -d "/data/.git" ] && git clone $WEBHOOK_REPOSITORY ./
git fetch --all
git reset --hard $WEBHOOK_BRANCH
