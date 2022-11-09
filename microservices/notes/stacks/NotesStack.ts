import { AppSyncApi, Config, Cognito, StackContext, Table } from "@serverless-stack/resources";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { join, dirname } from 'path';

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

  // We need to expose the service so we can create the federated GraphQL API.
  const schemaFile = join(dirname(''), `services/graphql/schema.graphql`);
  const SCHEMA = appsync.Schema.fromAsset(schemaFile).definition.replace('__typename: String!', '')

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
        environment: {
          SCHEMA
        },
      },
    },
    dataSources: {
      note: "functions/lambda.handler",
    },
    resolvers: {
      "Query    _service": "note",
      "Query    getNote": "note",
      "Mutation createNote": "note",
    },
  });

  new Config.Parameter(stack, "NOTES_APP_SYNC_API_ID", {
    value: notesAppSync.apiId
  });
  new Config.Parameter(stack, "NOTES_APP_SYNC_API_URL", {
    value: notesAppSync.url
  });

}
