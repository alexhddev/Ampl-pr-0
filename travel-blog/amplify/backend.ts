import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { generateThumb } from './functions/resize/resource';
import { imagesStorage } from './storage/resource';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { EventType } from 'aws-cdk-lib/aws-s3';

const backend = defineBackend({
  auth,
  data,
  imagesStorage,
  generateThumb,
});



backend.imagesStorage.resources.bucket.addEventNotification(
  EventType.OBJECT_CREATED_PUT,
  new LambdaDestination(backend.generateThumb.resources.lambda),
  {
    prefix: 'originals/'
  }
)
