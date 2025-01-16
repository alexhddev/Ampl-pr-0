import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth } from './Auth2.tsx'

import { Amplify } from 'aws-amplify';
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth></Auth>
  </StrictMode>,
)
