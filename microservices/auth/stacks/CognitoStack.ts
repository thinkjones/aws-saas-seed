import { Api, Cognito, Config, StackContext, AppSyncApi, Table } from "@serverless-stack/resources";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { dirname, join } from 'path';

export function CognitoStack({ stack, app }: StackContext) {
  // Create User Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  // We need to expose the service so we can create the federated GraphQL API.
  const schemaFile = join(dirname(''), `services/graphql/schema.graphql`);
  const SCHEMA = appsync.Schema.fromAsset(schemaFile).definition.replace('__typename: String!', '')

  // Create a notes table
  const usersTable = new Table(stack, "Users", {
    fields: {
      id: "string",
      name: "string",
      email: "string"
    },
    primaryIndex: { partitionKey: "id" },
  });

  // Create Api
  const api = new Api(stack, "Api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
    },
    routes: {
      "GET /private": "functions/private.main",
      "GET /public": {
        function: "functions/public.main",
        authorizer: "none",
      },
    },
  });

  // Create the AppSync GraphQL API
  const authAppSync = new AppSyncApi(stack, "AppSyncAuth", {
    schema: "services/graphql/schema.graphql",
    cdk: {
      graphqlApi: {
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: auth.cdk.userPool,
            },
          },
        },
      },
    },
    defaults: {
      function: {
        bind: [usersTable],
        environment: {
          SCHEMA
        },
      },
    },
    dataSources: {
      user: "functions/lambda.handler",
    },
    resolvers: {
      "Query    _service": "user",
      "Query    getCurrentUser": "user",
      "Mutation createUser": "user",
    },
  });

  // allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,

    // Show the AppSync API Id and API Key in the output
    AppSyncApiId: authAppSync.apiId,
    AppSyncUrl: authAppSync.url,
  });

  // Export Value for other stacks
  stack.exportValue(api.url, {name: 'ApiEndpoint'})
  stack.exportValue(auth.userPoolId, {name: 'UserPoolId'})
  stack.exportValue(auth.userPoolClientId, {name: 'UserPoolClientId'})
  stack.exportValue(authAppSync.apiId, {name: 'AppSyncApiId'})
  stack.exportValue(authAppSync.url, {name: 'AppSyncUrl'})

  // Write to parameter store
  new Config.Parameter(stack, "AUTH_API_ENDPOINT", {
    value: api.url
  });
  new Config.Parameter(stack, "AUTH_USER_POOL_ID", {
    value: auth.userPoolId
  });
  new Config.Parameter(stack, "AUTH_USER_POOL_CLIENT_ID", {
    value: auth.userPoolClientId
  });
  new Config.Parameter(stack, "AUTH_APP_SYNC_API_ID", {
    value: authAppSync.apiId
  });
  new Config.Parameter(stack, "AUTH_APP_SYNC_API_URL", {
    value: authAppSync.url
  });

}
