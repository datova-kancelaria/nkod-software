#!/bin/sh

set -e

echo "New update run started: $(date)" 

mv /opt/letsencrypt /etc/letsencrypt 

certbot certonly renew -q

mv /etc/letsencrypt /opt/letsencrypt
