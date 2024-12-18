import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth:{
        Cognito: {
            userPoolId: 'eu-central-1_QtHreAr5Q',
            userPoolClientId: '6dmdojf6o0f458l7j9ea7f2s86'
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