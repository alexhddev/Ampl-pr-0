import { client } from '../Client';

function ChatSimple() {
    async function getConversations(){
        const result = await client.conversations.chat.list();
        for (const conversation of result.data) {
            const messages = await conversation.listMessages();
            console.log(messages)
        }
    }

    return <main>
        <h1>Hello to the awesome AI Chat!!</h1><br />
        <button onClick={getConversations}>Print conversations to console</button>

    </main>
}

export default ChatSimple

