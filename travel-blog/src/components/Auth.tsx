import { Authenticator } from '@aws-amplify/ui-react';


export default function Auth() {

    return <>
        <Authenticator>
            {/* This is what you see when you sign in */}
            {({ signOut, user }) => (
                <div>
                    <h1>Hello {user?.signInDetails?.loginId}</h1>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
    </>
}