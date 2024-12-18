import { getSession, login } from './login'

async function main(){
    const result = await login('test', 'test')
    const session = await getSession();
    const a = 5;
}

main()