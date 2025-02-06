import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";


function Chat() {
    const client = generateClient<Schema>({ authMode: "userPool" });
    const { useAIConversation } = createAIHooks(client);
    const chat = useAIConversation('chat')

    const messages = chat[0].data.messages;
    const sendMessage = chat[1]

    return <main>
        <h1>Hello to the awesome AI Chat!!</h1><br />
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
            responseComponents={{
                Card: {
                    component: ChatCard,
                    props: {
                        text: {
                            type: 'string'
                        }
                    }
                }
            }}
        />

    </main>
}

function ChatCard(props: {
    text: string
}) {
    console.log('sdfsdfsd')
return <div>
    <h3>{props.text}</h3>
</div>
}

export default Chat

