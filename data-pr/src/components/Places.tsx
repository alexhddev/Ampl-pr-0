import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type PlaceType = Schema['Place']['type']



export function Places() {

    const placesClient = generateClient<Schema>().models.Place

    const [places, setPlaces] = useState<Array<PlaceType>>([])

    useEffect(() => {
        placesClient.observeQuery({
            authMode: 'apiKey'
        }).subscribe({
            next: (data) => setPlaces([...data.items])
        });
    }, []);

    function createPlace() {
        placesClient.create({
            location: window.prompt('Place location')
        }, {
            authMode: 'apiKey'
        })
    }

    return <main>
        <button onClick={createPlace}>Create place</button>
        <h3>All places:</h3>
        <ul>
            {places.map((place) => (
                <li key={place.id}>{place.location}</li>
            ))}
        </ul>

    </main>
}