import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";
import {PhotoViewerBackStack as config} from '../outputs.json'

const region = 'eu-west-1'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: config.userPoolId,
            userPoolClientId: config.userPoolWebClientId,
            identityPoolId: config.identityPoolId,
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

    const cognitoIdentityPool = `cognito-idp.${region}.amazonaws.com/${config.userPoolId}`;
    const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            identityPoolId: config.identityPoolId,
            clientConfig: { region: region },
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
            identityPoolId: config.identityPoolId,
            clientConfig: { region: region },
            logins : {
            }
        })
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
}