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
            responseComponents={{
                WeatherCard: {
                    description: 'Used to display the weather of a given city to the user',
                    // any React component can be used
                    component: (props) => {
                        return <Card
                            {...props}
                             />;
                    },
                    props: {
                        city: {
                            type: 'string',
                            required: true,
                        },
                        temperature: {
                            type: 'string'
                        },
                        unit: {
                            type: 'string'
                        }
                    },
                },
            }}
        />

    </main>
}

function Card(props: {
    city: string,
    temperature: string,
    unit: string
}) {

    console.log('Card props: ')
    console.log(props)
    return <div style={{ border: '1px solid black' }}>
        <h1>{props.city}</h1>
        <h2>{props.temperature} {props.unit}</h2>
    </div>
}

export default Chat

