# Live API

## Requirements

 - [Node v10.15+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install) or [Npm]()
 - [Mongo](https://www.mongodb.com/)

## Getting Started
Clone repo
```bash
$ git clone https://github.com/nhim175/live.git
$ cd live
```

## Installation

```bash
$ npm install
```
or
```bash
$ yarn
```

## Set environment variables:

```bash
$ cp .env.example .env
```
Make sure you provide enough environment variables in **.env** file

## Running the app

```bash
# development
$ yarn start 

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Formatting and error checking

```bash
# Format code with prettier
$ yarn format

# Check error and warning
$ yarn lint
```

