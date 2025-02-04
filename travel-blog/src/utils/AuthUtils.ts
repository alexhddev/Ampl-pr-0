import { fetchUserAttributes } from 'aws-amplify/auth';

export async function checkLoginAndGetName(): Promise<string | undefined>{
    try {
        const attributes = await fetchUserAttributes();
        if (attributes.nickname) {
            return attributes.nickname
        } else {
            return 'Someone'
        }
    } catch (error) {
        console.log('user is not logged in')
        return undefined
    }
}