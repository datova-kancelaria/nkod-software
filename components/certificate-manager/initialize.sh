#!/bin/bash

set -e

echo "New initialize run started: $(date)" 

certbot certonly --agree-tos --non-interactive --standalone -m $EMAIL -d $DOMAIN --cert-name nodc

mv /etc/letsencrypt /opt/letsencrypt
