import { NextjsSite, StackContext } from "@serverless-stack/resources";
import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export function WebStack({ stack, app }: StackContext) {

  // Get value from stack export
  const AUTH_API_ENDPOINT_EXPORT_VALUE = cdk.Fn.importValue('ApiEndpoint');
  // Get value from value written to Parameter Store.
  const AUTH_API_ENDPOINT = ssm.StringParameter.valueForStringParameter(this, `/sst/auth/${stack.stage}/Parameter/AUTH_API_ENDPOINT/value`)
  const AUTH_USER_POOL_ID = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_USER_POOL_ID/value`)
  const AUTH_USER_POOL_CLIENT_ID = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_USER_POOL_CLIENT_ID/value`)
  const AUTH_APP_SYNC_API_ID = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_APP_SYNC_API_ID/value`)
  const AUTH_APP_SYNC_API_URL = ssm.StringParameter.valueForStringParameter(this,  `/sst/auth/${stack.stage}/Parameter/AUTH_APP_SYNC_API_URL/value`)

  // Create a Next.js site
  const site = new NextjsSite(stack, "Site", {
    path: "frontend",
    environment: {
      // Pass the table details to our app
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_AUTH_API_ENDPOINT: AUTH_API_ENDPOINT,
      NEXT_PUBLIC_AUTH_USER_POOL_ID: AUTH_USER_POOL_ID,
      NEXT_PUBLIC_AUTH_USER_POOL_CLIENT_ID: AUTH_USER_POOL_CLIENT_ID,
      NEXT_PUBLIC_AUTH_APP_SYNC_API_ID: AUTH_APP_SYNC_API_ID,
      NEXT_PUBLIC_AUTH_APP_SYNC_API_URL: AUTH_APP_SYNC_API_URL
    },
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url,
  });

}
