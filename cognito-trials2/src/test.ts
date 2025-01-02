import { getSession, login } from './Auth.ts'
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

    // if (idToken) {
    //     console.log('Getting temporary credentials for authenticated user: ')
    //     const authCredentials = await generateTemporaryCredentials(idToken)
    //     console.log(authCredentials)
    // }

    // console.log('Getting temporary credentials for guest user: ')
    // const authCredentials = await generateTemporaryGuestCredentials()
    // console.log(authCredentials)
}

export async function test(element: HTMLButtonElement) {
  element.addEventListener('click', () => main())
}
