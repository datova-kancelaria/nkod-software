#!/bin/sh

set -e

echo "New update run started: $(date)" 

echo "Creating local copy of data"
cp -rf /opt/letsencrypt /etc/letsencrypt 

echo "Executing certbot"
certbot renew -q

echo "Publishing data"
cp -rf /etc/letsencrypt /opt/letsencrypt
