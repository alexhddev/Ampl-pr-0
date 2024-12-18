import { Amplify } from 'aws-amplify';
import {
  fetchAuthSession,
  CredentialsAndIdentityIdProvider,
  CredentialsAndIdentityId,
  GetCredentialsOptions,
  AuthTokens,
} from 'aws-amplify/auth';

// Note: This example requires installing `@aws-sdk/client-cognito-identity` to obtain Cognito credentials
// npm i @aws-sdk/client-cognito-identity
import { CognitoIdentity } from '@aws-sdk/client-cognito-identity';

// You can make use of the sdk to get identityId and credentials
const cognitoidentity = new CognitoIdentity({
  region: '<region-from-config>',
});

// Note: The custom provider class must implement CredentialsAndIdentityIdProvider
class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {

  // Example class member that holds the login information
  federatedLogin?: {
    domain: string,
    token: string
  };

  // Custom method to load the federated login information
  loadFederatedLogin(login?: typeof this.federatedLogin) {
    // You may also persist this by caching if needed
    this.federatedLogin = login;
  }

  async getCredentialsAndIdentityId(
    getCredentialsOptions: GetCredentialsOptions
  ): Promise<CredentialsAndIdentityId | undefined> {
    try {

      // You can add in some validation to check if the token is available before proceeding
      // You can also refresh the token if it's expired before proceeding

      const getIdResult = await cognitoidentity.getId({
        // Get the identityPoolId from config
        IdentityPoolId: '<identity-pool-id-from-config>',
        Logins: { [this.federatedLogin.domain]: this.federatedLogin.token },
      });

      const cognitoCredentialsResult = await cognitoidentity.getCredentialsForIdentity({
        IdentityId: getIdResult.IdentityId,
        Logins: { [this.federatedLogin.domain]: this.federatedLogin.token },
      });

      const credentials: CredentialsAndIdentityId = {
        credentials: {
          accessKeyId: cognitoCredentialsResult.Credentials?.AccessKeyId,
          secretAccessKey: cognitoCredentialsResult.Credentials?.SecretKey,
          sessionToken: cognitoCredentialsResult.Credentials?.SessionToken,
          expiration: cognitoCredentialsResult.Credentials?.Expiration,
        },
        identityId: getIdResult.IdentityId,
      };
      return credentials;
    } catch (e) {
      console.log('Error getting credentials: ', e);
    }
  }
  // Implement this to clear any cached credentials and identityId. This can be called when signing out of the federation service.
  clearCredentialsAndIdentityId(): void {}
}

// Create an instance of your custom provider
const customCredentialsProvider = new CustomCredentialsProvider();
Amplify.configure(awsconfig, {
  Auth: {
    // Supply the custom credentials provider to Amplify
    credentialsProvider: customCredentialsProvider
  },
});