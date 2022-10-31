import { Api, Cognito, StackContext, } from "@serverless-stack/resources";

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
}
