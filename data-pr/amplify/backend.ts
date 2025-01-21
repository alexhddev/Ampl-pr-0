import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { guestData } from './data/guest-resource';
import { ownerData } from './data/owner-resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  guestData,
  ownerData

});
