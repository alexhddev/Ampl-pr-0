import { getSession, login, generateTemporaryCredentials } from './login.ts'
import config from '../config.json'

async function main() {
    const result = await login(
        config.credentials.username,
        config.credentials.password)
    console.log('result: ')
    console.log(JSON.stringify(result, null, 2))

    const session = await getSession();
    console.log('session: ')
    console.log(JSON.stringify(session, null, 2))

    console.log('How a token looks: ')
    const idToken = session.tokens?.idToken?.toString();
    console.log(idToken)

    if (idToken) {
        console.log('Getting temporary credentials for authenticated user: ')
        const authCredentials = await generateTemporaryCredentials(idToken)
        console.log(JSON.stringify(authCredentials, null, 2))
    }


}

main()