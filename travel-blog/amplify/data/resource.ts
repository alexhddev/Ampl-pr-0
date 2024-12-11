import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  Place: a.
    model({
      id: a.id().required(),
      name: a.string().required(),
      description: a.string().required(),
      photos: a.string().array(),
      thumbs: a.string().array(),
      comments: a.hasMany('Comment', 'placeId'),
      likesBy: a.string().array(),
    }).authorization((allow) => [allow.publicApiKey()]),
  Comment: a.
    model({
      placeId: a.id(),
      place: a.belongsTo('Place', 'placeId'),
      content: a.string().required(),
      author: a.string().required(),
    }).authorization((allow) => [allow.publicApiKey()]),
});

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