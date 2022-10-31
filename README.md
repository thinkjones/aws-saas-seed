# aws-seed-saas-login-cognito

# Setup
* Install NVM - Node 18.12.0
* Install YARN
* `yarn install`
* Run build to test 

# Microservices
## Folder Layout aka MonoRepo
The Microservices (MS) separates the services in this MonoRepo. In production each MS would be housed in it's 
own repo. In order to maintain decoupling each folder in MS folder is not allowed to refer to each other.

## Microservices
Several microservices make up this example application.
1. auth - Handles authentication via cognito
2. web - Web app to login to SaaS app.
3. links - Links processor to CRUD web links.
4. supergraph - Apollo Super graph to pull apis together.









# Background
* Uses typescript seed project from [the blog](https://khalilstemmler.com) and [github](https://github.com/stemmlerjs/simple-typescript-starter)

### Scripts

#### `yarn start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `yarn  start`

Starts the app in production by first building the project with `yarn  build`, and then executing the compiled JavaScript at `build/index.js`.

#### `yarn  build`

Builds the app at `build`, cleaning the folder first.

#### `yarn  test`

Runs the `jest` tests once.

#### `yarn  test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `yarn  prettier-format`

Format your code.

#### `yarn  prettier-watch`

Format your code in watch mode, waiting for file changes.
