import { Api, Cognito, Config, StackContext, } from "@serverless-stack/resources";

export function CognitoStack({ stack, app }: StackContext) {
  // Create User Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
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

  // allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  // Export Value for other stacks
  stack.exportValue(api.url, {name: 'ApiEndpoint'})
  stack.exportValue(auth.userPoolId, {name: 'UserPoolId'})
  stack.exportValue(auth.userPoolClientId, {name: 'UserPoolClientId'})

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

}
