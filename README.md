# cfs-liason
serverless architecture to connect to external services, parse data, and persist the results
___

## package err'y thing up
We're using ansible to transpile all the functions placed into the `lambda_functions` directory.

To run basic playbook use:
```bash
$ ansible-playbook lambda_upload.yml --vault-password-file=~/.aws-vault.txt
```
- _ps: you'll need to get the super secret password to put into the vault file in order to decrypt the secrets files_


To edit the secrets files:
```bash
ansible-vault edit secrets/development.yml --vault-password-file ~/.aws-vault.txt
```
