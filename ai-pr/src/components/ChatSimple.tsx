import { AIConversation } from '@aws-amplify/ui-react-ai'
import { useAIConversation } from '../Client';



function ChatSimple() {
    const chat = useAIConversation('chat')

    const messages = chat[0].data.messages;
    const sendMessage = chat[1]

    return <main>
        <h1>Hello to the awesome AI Chat!!</h1><br />
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
        />

    </main>
}

export default ChatSimple

