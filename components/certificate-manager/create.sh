#!/bin/sh

set -e

echo "New initialize run started: $(date)" 

certbot certonly --agree-tos --non-interactive --standalone -m $EMAIL -d $DOMAIN --cert-name nodc

echo "Listing content of /opt/letsencrypt"
ls -R /opt/letsencrypt

cp -rf /etc/letsencrypt /opt/letsencrypt
