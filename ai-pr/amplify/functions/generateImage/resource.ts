import { defineFunction } from "@aws-amplify/backend";

export const MODEL_ID = "amazon.titan-image-generator-v1";
export const REGION = "eu-west-1";

export const generateImage = defineFunction({
  name: "generateImage",
  entry: "./handler.ts",
  environment: {
    MODEL_ID,
    REGION,
  },
  timeoutSeconds: 120,
  bundling: {
    minify: false
  }
});
