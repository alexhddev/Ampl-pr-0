import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../amplify_outputs.json';
import { Authenticator } from '@aws-amplify/ui-react'

Amplify.configure(outputs);

createRoot(document.getElementById('root')!).render(
    <Authenticator>
        <App />
    </Authenticator>

)
