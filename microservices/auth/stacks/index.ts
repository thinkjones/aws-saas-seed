import { App } from "@serverless-stack/resources";
import { CognitoStack } from './CognitoStack';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(CognitoStack);
}
