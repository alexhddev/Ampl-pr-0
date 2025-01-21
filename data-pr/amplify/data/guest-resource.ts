import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Place: a
    .model({
      location: a.string(),
    })
    .authorization(
      (allow) => 
        [
          allow.guest(),
      ])
});

export type GuestSchema = ClientSchema<typeof schema>;

export const guestData = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
