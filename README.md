## Aws SAM generator
just write your lambda files and we can automate the rest
___

## package err'y thing up
We're using babel via ansible to transpile all the functions placed into the `lambda_functions` directory.

To run basic playbook use:
```bash
ansible-playbook deploy.yml --vault-password-file=~/.aws-vault.txt -v
```
- _ps: you'll need to get the super secret password to put into the vault file in order to decrypt the existing secrets files_
- __Or__, you can just create a new [ansible-vault](http://docs.ansible.com/ansible/latest/vault.html) encrypted files to store your secrets.

Running the playbook above will:
- transpile all es6 code into es5 and bundle it up with npm production dependencies.
- upload the resultant zip files to s3
  - utilizing syncing to only update files that've changed
- generate an AWS SAM (serverless architecture model) cloudformation template
- package the SAM template into a cloudformation template
- deploy the stack to AWS

When developing new lambda functions:
- create a new directory in ./lambda_functions dir
  - the name of the directory must equal the name of your function
- within new directory, create a src
- Todo ---> finish writing this bit

To edit the secrets files:
```bash
ansible-vault edit secrets/development.yml --vault-password-file ~/.aws-vault.txt
```
---
### Local Development
aws has a slick sdk for testing SAM applications locally, aptly named [aws-sam-local](https://github.com/awslabs/aws-sam-local)

To use this sdk for development and testing follow the prompts in the github readme to get `aws-sam-local` installed.
Then you must generate a SAM template pointing to the local zip files
- run the playbook to generate `sam_template.yml` 
    - `ansible-playbook bundle_local.yml -v`
- launch the sam local api
    - `sam local start-api -t sam_template_local.yml`
    - this will output the api routes generated (dope!)
    - test away in your browser, `curl`, postman, or whatever's clever
- for hot-reloading you can ask `babel` to watch for changes to the src file
    - `cd lambda_functions/<your_function_here>; babel src -d dist -w`
