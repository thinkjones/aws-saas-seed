import { NextjsSite, StackContext } from "@serverless-stack/resources";

export function WebStack({ stack, app }: StackContext) {

  // Create a Next.js site
  const site = new NextjsSite(stack, "Site", {
    path: "frontend",
    environment: {
      // Pass the table details to our app
      REGION: app.region
    },
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url,
  });

}
