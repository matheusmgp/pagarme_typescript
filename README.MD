## Description

Teste pagarME API.

## Setup

1 - Clone the repository

```bash
$ git clone https://github.com/matheusmgp/pagarme_typescript.git

```

2 - Install the project dependencies

```bash
$ npm install
```

3 - It's necessary docker in your local machine,to run postgres container image,otherwise,you will need local postgres database.

4 - Run the below bash,to start a postgres docker container image

```bash
$ docker-compose up -d

$ npx prisma migrate dev
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Testing the app

```bash
# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# integration tests
$ npm run test:int
```
