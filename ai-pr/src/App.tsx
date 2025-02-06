// import './App.css'
import { Authenticator } from '@aws-amplify/ui-react'
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';



function App() {
  const client = generateClient<Schema>({ authMode: "userPool" }); //{ authMode: "userPool" }
  const { useAIConversation, useAIGeneration } = createAIHooks(client);

  const conversation = useAIConversation('chat')
  const messages = conversation[0].data.messages;
  const isLoading = conversation[0].isLoading;
  const sendMessage = conversation[1];

  useEffect(() => {
    console.log('Messages:', messages[1]?.content[0]?.text);
  }, [messages]);


  return (
    <>
      <Authenticator>
        <AIConversation
          messages={messages}
       //   isLoading={isLoading}
          handleSendMessage={sendMessage}

        ></AIConversation>
      </Authenticator>
    </>
  )
}

export default App
