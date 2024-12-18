import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import config from '../config.json'

Amplify.configure({
    Auth:{
        Cognito: {
            userPoolId: config.amplify.userPoolId,
            userPoolClientId: config.amplify.userPoolClientId
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

export async function getSession(){
    const session = await fetchAuthSession();
    return session;
}