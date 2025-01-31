import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Place: a
    .model({
      location: a.string(),
    })
    .authorization(
      (allow) => [

        allow.publicApiKey()
      ]),
  Task: a
    .model({
      description: a.string(),
    })
    .authorization(allow => [
      allow.owner(),
      allow.group('Admins').to(['read'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
  },
});
