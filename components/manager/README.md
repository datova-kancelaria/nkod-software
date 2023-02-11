# Component:  Manager 
Manager manager harvesting.
This component should be executed automatically in required time.

Execution of this image include:
* Synchronization of LP:ETL pipelines and pipelines
* Synchronization of registration records
* Execution of selected pipeline

## Environment variables
* *STORAGE_REPOSITORY* - URL of repository with LP:ETL pipelines and components.
* *STORAGE_REPOSITORY_BRANCH* - Name of a branch to employ
* *RELOAD_URL* - URL of LP:ETL storage to force reload from file system. 
  This is ```{storage-url}/api/v1/management/reload```, where ```{storage-url}``` is URL of the LP:ETL storage component.
* *FRONTEND_URL* - URL of LP:ETL frontend component, used to start pipeline execution.  
* *PIPELINE_URL* - IRI of a pipeline from STORAGE_REPOSITORY* to execute.
* *REGISTRATION_REPOSITORY* - URL of repository with registrations.
* *REGISTRATION_REPOSITORY_BRANCH* - Branch to use for registration.
