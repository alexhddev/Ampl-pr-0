import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({


  Comment: a.customType({
    author: a.string(),
    content: a.string(),    
  }),
  Place: a.
    model({
      id: a.id().required(),
      name: a.string().required(),
      description: a.string().required(),
      photos: a.string().array(),
      thumbs: a.string().array(),
      comments: a.ref('Comment').array(),
      likesBy: a.string().array(),
    })
}).authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    }
  },
});