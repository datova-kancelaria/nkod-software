#!/bin/sh

set -e

echo "New update run started: $(date)" 

mv /opt/letsencrypt /etc/letsencrypt 

certbot certonly --agree-tos --non-interactive --standalone -m $EMAIL -d $DOMAIN --cert-name nodc

mv /etc/letsencrypt /opt/letsencrypt
