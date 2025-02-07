import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversation } = createAIHooks(client);


function Chat() {

    const chat = useAIConversation('chat')

    const messages = chat[0].data.messages;
    const sendMessage = chat[1]

    return <main>
        <h1>Hello to the awesome AI Chat!! - OLD</h1><br />
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
        />

    </main>
}

export default Chat

