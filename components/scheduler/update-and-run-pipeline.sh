#!/bin/bash

echo " New run started: $(date)" 

echo "Checking out data ..."
mkdir -p /tmp/storage/
cd /tmp/storage/
git clone $STORAGE_REPOSITORY ./

echo "Moving data to storage ..."
cp -r ./pipelines /data/lp-etl/storage/pipelines
cp -r ./tmplates /data/lp-etl/storage/tmplates

echo "Removing tmporary data"
rm -r cd /tmp/storage/

# Execute a POST to given URL to start the execution. 
# This may actually fail for the first time as the storage
# do not reload data on demand.
echo "Executing POST request"
curl -X POST $POST_URL
