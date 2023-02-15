#!/bin/sh

set -e

echo "New update run started: $(date)" 

cp -rf /opt/letsencrypt /etc/letsencrypt 

echo "Executing certbot"

certbot certonly renew -q

echo "Listing content of /opt/letsencrypt"
ls -R /opt/letsencrypt

cp -rf /etc/letsencrypt /opt/letsencrypt
