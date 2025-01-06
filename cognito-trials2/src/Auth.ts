import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";
import config from '../config.json'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: config.amplify.userPoolId,
            userPoolClientId: config.amplify.userPoolClientId,
            // identityPoolId: config.amplify.identityPoolId,
        }
    }
})

export async function login(userName: string, password: string) {
    const signInOutput: SignInOutput = await signIn({
        username: userName,
        password: password,
    });
    return signInOutput;
}

export async function getSession() {
    const session = await fetchAuthSession();
    return session;
}

export async function generateTemporaryCredentials(idToken: string) {

    const cognitoIdentityPool = `cognito-idp.${config.aws.region}.amazonaws.com/${config.amplify.userPoolId}`;
    const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            identityPoolId: config.amplify.identityPoolId,
            clientConfig: { region: config.aws.region },
            logins : {
                [cognitoIdentityPool]: idToken
            }
        })
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
}

export async function generateTemporaryGuestCredentials() {

    const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            identityPoolId: config.amplify.identityPoolId,
            clientConfig: { region: config.aws.region },
            logins : {
            }
        })
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
}