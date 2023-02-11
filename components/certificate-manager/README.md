# Component: Certificate manager
Wraps Certbot to tackle issues with data sharing.
Certbot write data to /etc/letsencrypt yet it need to create a lock.
Locks are not available on NFS, like Kubernetes File Systems.

## Environment variables
* *EMAIl* - Email to use for registration.
* *DOMAIN* - Name of domain to get the certificate for.
