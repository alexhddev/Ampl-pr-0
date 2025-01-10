import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sayHello } from "../functions/hello/resource"

const schema = a.schema({
    
  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(sayHello)),

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