import { generateClient } from "aws-amplify/api"
import { Schema } from "../../amplify/data/resource"


const client = generateClient<Schema>()



function Home() {

    async function sayHello() {
        const result = await client.queries.sayHello({
            name: 'Barosanu'
        })
        console.log(result)
    }

    return <main>
        <button onClick={sayHello}>Click me</button>
        <h1>This is the home component</h1><br />
    </main>
}

export default Home

