import './App.css'
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

function Auth() {


  return (
    <div>
      <Authenticator>
        <h1>Hello! You are authenticated!</h1>
      </Authenticator>
    </div>
  )
}

export default Auth
