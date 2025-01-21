import type { GuestSchema } from "../../amplify/data/guest-resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type PlaceType = GuestSchema['Place']['type']



export function Places() {

    const placesClient = generateClient<GuestSchema>().models.Place

    const [places, setPlaces] = useState<Array<PlaceType>>([])

    useEffect(() => {
        placesClient.observeQuery().subscribe({
            next: (data) => setPlaces([...data.items])
        });
    }, []);

    function createPlace() {
        placesClient.create({
            location: window.prompt('Place location')
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