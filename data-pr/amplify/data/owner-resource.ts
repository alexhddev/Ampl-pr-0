import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Task: a
  .model({
    description: a.string(),
  }).authorization(allow => [allow.owner()]),
});

export type OwnerSchema = ClientSchema<typeof schema>;

export const ownerData = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
