# cfs-liason
serverless architecture to connect to external services, parse data, and persist the results
___

## package err'y thing up
We're using babel via ansible to transpile all the functions placed into the `lambda_functions` directory.

To run basic playbook use:
```bash
ansible-playbook deploy.yml --vault-password-file=~/.aws-vault.txt
```
- _ps: you'll need to get the super secret password to put into the vault file in order to decrypt the secrets files_

Running the playbook above will:
- transpile all es6 code into es5 and bundle it up with npm production dependencies.
- upload the resultant zip files to s3
  - utilizing syncing to only update files that've changed
- generate an AWS SAM (serverless architecture model) cloudformation template
- package the SAM template into a cloudformation template
- deploy the stack to AWS

To edit the secrets files:
```bash
ansible-vault edit secrets/development.yml --vault-password-file ~/.aws-vault.txt
```
