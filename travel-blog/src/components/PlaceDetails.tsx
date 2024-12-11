import { useParams } from "react-router";

function PlacesDetails() {

    const { id } = useParams();


    return <main>
        <h1>Details for place {id}</h1><br />
    </main>
}

export default PlacesDetails

