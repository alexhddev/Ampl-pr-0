import { useParams } from "react-router";
import { useEffect, useState } from "react"
import { Place } from "./Places";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

/**
 * eg route: localhost:5173/places/1234554
 */
function PlacesDetails() {

    const client = generateClient<Schema>();

    const { id } = useParams();
    const [place, setPlace] = useState<Place | undefined>(undefined)

    useEffect(() => { 
        const handleData = async () =>{
            const subscription = client.models.Place.onUpdate({// not working
                filter: {
                    id: {
                        eq: id
                    }
                }
            }).subscribe({
                next: (data) => {
                    console.log(data)
                    setPlace(data)
                }
            })
            return () => subscription.unsubscribe();
        }
        handleData();
    }, [])


    return <main>
        <h1>Details for place {id}</h1><br />
        <p>{place?.name}</p>
        <p>{place?.description}</p>
    </main>
}

export default PlacesDetails

