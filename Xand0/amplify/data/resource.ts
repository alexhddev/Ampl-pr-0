import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Game: a
    .model({
      id: a.id().required(),
      playerX: a.string(),
      player0: a.string(),
      moves: a.string().array(),
      lastMoveBy: a.string(),
      expireAt: a.timestamp()
    })
    .authorization((allow) => [allow.publicApiKey()]),
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

