#!/bin/bash

# Hash passwords.
GRAPHDB_ADMIN_PASSWORD_BCRYPT=$(htpasswd -bnBC 10 "" $GRAPHDB_ADMIN_PASSWORD | tr -d ':\n')
GRAPHDB_PASSWORD_BCRYPT=$(htpasswd -bnBC 10 "" $GRAPHDB_PASSWORD | tr -d ':\n')

# Prepare configuration
sed -i \
  -e "s|{ADMIN_PASSWORD_BCRYPT}|$GRAPHDB_ADMIN_PASSWORD_BCRYPT|g" \
  -e "s|{USERNAME}|$GRAPHDB_USER|g" \
  -e "s|{PASSWORD_BCRYPT}|$GRAPHDB_PASSWORD_BCRYPT|g" \
  /opt/graphdb/home/work/workbench/settings.js

# Prepare data directory
mkdir -p /data/graphdb
cp -r /opt/graphdb/home/repositories/ /data/graphdb/

# Start the service with given home directory.
exec graphdb -Dgraphdb.home=/opt/graphdb/home -Ddefault.min.distinct.threshold=$GRAPHDB_DISTINCT_THRESHOLD
