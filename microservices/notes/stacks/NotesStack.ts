import { AppSyncApi, Cognito, StackContext, Table } from "@serverless-stack/resources";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

export function NotesStack({ stack }: StackContext) {

  const AUTH_USER_POOL_ID = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_USER_POOL_ID/value`)
  const AUTH_USER_POOL_CLIENT_ID = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_USER_POOL_CLIENT_ID/value`)

  // Import existing pool - https://docs.sst.dev/constructs/Cognito#importing-an-existing-user-pool
  const existingAuthPool = new Cognito(stack, "Auth", {
    cdk: {
      userPool: UserPool.fromUserPoolId(stack, "IUserPool", AUTH_USER_POOL_ID),
      userPoolClient: UserPoolClient.fromUserPoolClientId(stack, "IUserPoolClient", AUTH_USER_POOL_CLIENT_ID),
    },
  });

  // Create a notes table
  const notesTable = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      dateCreated: "string",
      note: "string"
    },
    primaryIndex: { partitionKey: "userId", sortKey: "dateCreated" },
  });

  // Create the AppSync GraphQL API
  const notesAppSync = new AppSyncApi(stack, "AppSyncNotes", {
    schema: "services/graphql/schema.graphql",
    cdk: {
      graphqlApi: {
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: existingAuthPool.cdk.userPool
            },
          },
        },
      },
    },
    defaults: {
      function: {
        bind: [notesTable],
      },
    },
    dataSources: {
      note: "functions/lambda.handler",
    },
    resolvers: {
      "Query    getNote": "note",
      "Mutation createNote": "note",
    },
  });

}
