import { generateTemporaryCredentials, generateTemporaryGuestCredentials, getSession, login } from './Auth.ts'
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import config from '../config.json'

async function main() {
    const result = await login(
        config.credentials.username,
        config.credentials.password)
    console.log('result: ')
    console.log(result)

    const session = await getSession();
    console.log('session: ')
    console.log(session)

    console.log('How a token looks: ')
    const idToken = session.tokens?.idToken?.toString();
    console.log(idToken)

    if (idToken) {
        console.log('Getting temporary credentials for authenticated user: ')
        const authCredentials = await generateTemporaryCredentials(idToken)
        const bucketFiles = await listBucketContents(authCredentials);
        console.log(bucketFiles)
    }

    console.log('Getting temporary credentials for guest user: ')
    const authCredentials = await generateTemporaryGuestCredentials()
    try {
      const bucketFiles = await listBucketContents(authCredentials);
    } catch (error) {
      console.error(error)
    }

}

export async function test(element: HTMLButtonElement) {
  element.addEventListener('click', () => main())
}

async function listBucketContents(credentials: any){
  const client = new S3Client({
    credentials: credentials,
    region: config.aws.region
  })
  const bucketName = config.s3.bucketName;
  const result = await client.send(new ListObjectsV2Command({
    Bucket: bucketName
  }))
  return result;


}
