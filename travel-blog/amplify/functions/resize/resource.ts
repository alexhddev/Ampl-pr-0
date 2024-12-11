import { defineFunction } from '@aws-amplify/backend';

export const generateThumb = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'resize-image',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',

  bundling: {
    minify: false
  },
  timeoutSeconds: 60

});