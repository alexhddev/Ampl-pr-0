import { getSession, login } from './login.ts'

async function main() {
    const result = await login('barosanu', 'Isdufhie354$')
    console.log('result: ')
    console.log(JSON.stringify(result, null, 2))

    const session = await getSession();
    console.log('session: ')
    console.log(JSON.stringify(session, null, 2))

    console.log('How a token looks: ')
    const idToken = session.tokens?.accessToken.toString();
    console.log(idToken)
}

main()