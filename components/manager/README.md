# Scheduler 
Scheduler allow for harvesting execution.
This component should be executed automatically in required time.

Execution of this image include:
* Synchronization of LP:ETL pipelines and pipelines
* Execution of selected pipeline

In addition, and temporarily, this component synchronize Git repository with registrations.

## Environment variables
* *STORAGE_REPOSITORY* - URL of repository with LP:ETL pipelines and components.
* *RELOAD_URL* - URL of LP:ETL storage to force reload from file system. 
  This is ```{storage-url}/api/v1/management/reload```, where ```{storage-url}``` is URL of the LP:ETL storage component.
* *EXECUTE_PIPELINE_URL* - Full URL for pipeline execution POST, not only pipeline URL.
  This is ```{frontend-url}/api/v1/executions?pipeline={pipeline-url}```, where ```{frontend-url}``` is URL of LP:ETL frontend and ```{pipeline-url}``` is URL of pipeline to execute.
* *PIPELINE_REPOSITORY* - URL of repository with registrations.
