import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { Tasks } from "./Tasks";


export function AuthWrapper(){

    return <Authenticator>
       <Tasks></Tasks> 
    </Authenticator>
}