# :space_invader: spacex

> Level Software Development

## :arrow_forward: Usage

Add the neccesary keys to the .env file. Then run:

```sh
yarn run start
```

### Create the database

To create a database for the project run:

```sh
cd ./infrastructure
bash start.sh
```

## :dizzy: Deployment

When deploying a project, add the following secrets to your repo settings (under secrets actions) and any project dependant secrets to AWS Systems Manager:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

Now remove line 13 from `.github/workflows/deploy-server.yml` and merge your project into the main branch.

AWS Cloudformation will now generate your project.

## :computer: Contributing

Contributions are very welcome, as well as issues created for any updates required.
