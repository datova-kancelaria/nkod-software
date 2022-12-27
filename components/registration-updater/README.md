# Registration updater
This component is design to synchronize content git repository with registration records with the local file system.
The synchronization is carried out in the ```registrations-update.sh``` script. 
All local changes are discarded as a result of the synchronization.
The script is called using PHP webhook.

We also have custom entry point that make sure that the repository exists and is up-to date.

## Environment variables
 * *WEBHOOK_CMD* - Command to execute by the webhook.
 * *WEBHOOK_TOKEN* - Security token from GitHub.
 * *WEBHOOK_REF* - Reference to a branch, i.e. ```refs/heads/main```.
 * *WEBHOOK_REPOSITORY* - Name of the repository with the owner, i.e. ```organizations/registrations```.
 * *WEBHOOK_REPOSITORY_NAME* - URL of repository, used for ```git clone```.
