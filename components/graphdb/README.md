# GraphDB
Wraps user provided version of GraphDB.
In order to build this image you need to provide GraphDB archive at ```GRAPHDB_URL``` as specified in the Docker file.
Notice that we employ ADD to copy the resource.
As a result we can employ external URL as the source of the archive.

In addition the Docker image utilize ```entrypoint.sh``` to:
 * Prepare configuration
 * Create empty database if it does not exists
 * Cleanup

As the password is provided as environment variable, we need to update the configuration with it before we start GraphDB.
To do so we read the password from environment property, apply bcrypt and store it into ```settings.js```.

The created database is created from the template provided in the ```repositories``` directory.
The objective is to remove a need to manually create a database on startup.
The name of the repository is *nodc*.

The last step before start-up is to remove any existing lock file as the previous instance may be terminated without proper shutdown.

## Environment variables
 * *GRAPHDB_ADMIN_PASSWORD* - Admin password.
 * *GRAPHDB_USER* - Name of a user with access to *nodc* repository.
 * *GRAPHDB_PASSWORD* - Password for the *GRAPHDB_USER*.
 * *GRAPHDB_DISTINCT_THRESHOLD* - Given as ```default.min.distinct.threshold``` to GraphDB. Limit memory requirements.
