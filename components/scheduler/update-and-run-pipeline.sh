#!/bin/bash

echo "New run started: $(date)" 

echo "Checking out data ..."
mkdir -p /tmp/storage/
cd /tmp/storage/
git clone $STORAGE_REPOSITORY ./

echo "Moving data to storage ..."
cp -r ./pipelines /data/lp-etl/storage/
cp -r ./templates /data/lp-etl/storage/

echo "Removing tmporary data"
rm -rf /tmp/storage/

# Execute a POST 
echo "Reloading store"
curl -X POST $RELOAD_URL

# Execute a POST to given URL to start the execution. 
# This may actually fail for the first time as the storage
# do not reload data on demand.
echo "Executing POST request"
curl -X POST $EXECUTE_PIPELINE_URL
