import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Place: a
    .model({
      location: a.string(),
    })
    .authorization(
      (allow) => [
        allow.guest(),
        allow.authenticated()// de adaugat asta ulterior, de analizat eroarea
      ]),
  Task: a
    .model({
      description: a.string(),
    })
    .authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
