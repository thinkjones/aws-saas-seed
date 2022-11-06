# aws-seed-saas
Barebones SaaS application that deploys to AWS and demonstrates authentication and a graphql endpoint within a microservices design pattern. It's very rough and ready. A working project to help me work through some design patterns for microservices within the awesome [sst.dev](https://sst.dev/) IaaS framework.

![ScreenShot](https://user-images.githubusercontent.com/108007/200188674-7dfeab0e-7fab-44f4-aa82-8ddaa7b81ea3.png)

I stumbled across [sst.dev](https://sst.dev/) last week, after using [Serverless](https://www.serverless.com/) this is a potential breath of
fresh air. A BIG SHOUT OUT to this project. Very impressed!!

**It demonstrates:**
* Use of [sst.dev](https://sst.dev/) in a microservices deployment on AWS.
* Integration of [NextJS](https://nextjs.org/) within [sst.dev](https://sst.dev/) using the SaaS Admin Dashboard project [Horizon UI](https://horizon-ui.com/)
* Uses AWS Cognito for authentication.
* Uses AWS AppSync to demo getCurrentUser info for Navbar top right.
* Uses AWS Amplify for client side configuration.
* Uses ApolloClient configured to use AWS App Sync.

**What can you use it for?**
* You want a starter app that allows users to login. You still have to build your app but the starter is there to get you going.

**What I want to implement!**
* SaaS concepts of Accounts and Users.
* Flexible permissions system
* Demo of Apollo Supergraph building a univeral api across serveral microservices.
* Additional login options (Google, Facebook)

# Running
* There are two microservices `auth` and `web` these can either be deployed to aws or tested locally using [sst.dev](https://sst.dev/).
```
Deploy (both microservices):
yarn deploy --stage dev

Run in Dev Mode (both microservices):
yarn start --stage dev

plus run web app in 3rd terminal:
yarn run dev

```



# Microservices
## Folder Layout aka MonoRepo
The Microservices (MS) (auth and web) are decoupled in this MonoRepo. In a production codebase each MS could be housed in it's own repo.
In order to maintain decoupling each folder in MS folder is not allowed to refer to each other. This goes against the principles of
[sst.dev](https://sst.dev/). 

I think there is a small design flaw within [sst.dev](https://sst.dev/). They recommend that you build your application with a MonoRepo to allow
stacks to be coupled with each and refer to each other's dependencies. This is problematic because it dictates (too much IMHO) on how the 
codebase should be structured and it makes it difficult to integrate with existing applications. This may work for small projects with a non-microservice or small microservice 
architecture but it will not scale well. It goes against the decoupled foundational principle of microservices.  Since microservices only usually have to 
share a minimal amount of info I have used the Parameter Store as a way of maintaining this communication, rather than coupling the stacks.

Although this code *is* a MonoRepo it's done just for demonstration purposes the folders under microservices can exist as different repos.

# Tasks 
Several microservices make up this example application.
DONE - 1. auth - Handles authentication via cognito
DONE - 2. web - Web app to login to SaaS app.
TODO - 3. links - Links processor to CRUD web links.
TODO - 4. supergraph - Apollo Super graph to pull apis together.
TODO - 5. CI/CD - Auto deploy after running some FE and BE tests using Github Actions.


# SST.DEV Scripts

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
