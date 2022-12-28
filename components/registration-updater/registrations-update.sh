#!/bin/bash

cd /data/registration

# Clone if the direcotry is empty.
[ ! -d ".git" ] && git clone $WEBHOOK_REPOSITORY ./

# Update data.
git fetch --all
git reset --hard HEAD
git pull

# Update ownership, as git would change that to current user.
chown -R nodc:nodc .
