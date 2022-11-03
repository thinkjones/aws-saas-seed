import { NextjsSite, StackContext } from "@serverless-stack/resources";
import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export function WebStack({ stack, app }: StackContext) {

  // Get value from stack export
  const AUTH_API_ENDPOINT_EXPORT_VALUE = cdk.Fn.importValue('ApiEndpoint');
  // Get value from value written to Parameter Store.
  const AUTH_API_ENDPOINT = ssm.StringParameter.fromStringParameterName(this, 'AUTH_API_ENDPOINT', `/sst/auth/${stack.stage}/parameters/AUTH_API_ENDPOINT`).stringValue
  const AUTH_USER_POOL_ID = ssm.StringParameter.fromStringParameterName(this, 'AUTH_USER_POOL_ID', `/sst/auth/${stack.stage}/parameters/AUTH_USER_POOL_ID`).stringValue
  const AUTH_USER_POOL_CLIENT_ID = ssm.StringParameter.fromStringParameterName(this, 'AUTH_USER_POOL_CLIENT_ID', `/sst/auth/${stack.stage}/parameters/AUTH_USER_POOL_CLIENT_ID`).stringValue

  // Create a Next.js site
  const site = new NextjsSite(stack, "Site", {
    path: "frontend",
    environment: {
      // Pass the table details to our app
      REGION: app.region,
      AUTH_API_ENDPOINT_EXPORT_VALUE,
      AUTH_API_ENDPOINT,
      AUTH_USER_POOL_ID,
      AUTH_USER_POOL_CLIENT_ID
    },
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url,
  });

}
