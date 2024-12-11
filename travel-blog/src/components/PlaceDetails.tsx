import { useParams } from "react-router";


/**
 * eg route: localhost:5173/places/1234554
 */
function PlacesDetails() {

    const { id } = useParams();


    return <main>
        <h1>Details for place {id}</h1><br />
    </main>
}

export default PlacesDetails

