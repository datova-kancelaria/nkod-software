#!/bin/bash

# Hash passwords.
ADMIN_PASSWORD_BCRYPT=$(htpasswd -bnBC 10 "" $GRAPHDB_ADMIN_PASSWORD | tr -d ':\n')
PASSWORD_BCRYPT=$(htpasswd -bnBC 10 "" $GRAPHDB_PASSWORD | tr -d ':\n')

# Prepare configuration
sed -i \
  -e "s|{ADMIN_PASSWORD_BCRYPT}|$ADMIN_PASSWORD_BCRYPT|g" \
  -e "s|{USERNAME}|$GRAPHDB_USER|g" \
  -e "s|{PASSWORD_BCRYPT}|$PASSWORD_BCRYPT|g" \
  /opt/graphdb/home/work/workbench/settings.js

printf "graphdb.external-url = $GRAPHDB_EXTERNAL_URL\n" >> /opt/graphdb/home/conf/graphdb.properties

# Prepare data directory
mkdir -p /data/graphdb
cp -r /opt/graphdb/home/repositories/ /data/graphdb/

# Start the service with given home directory.
exec graphdb -Dgraphdb.home=/opt/graphdb/home -Ddefault.min.distinct.threshold=$GRAPHDB_DISTINCT_THRESHOLD
