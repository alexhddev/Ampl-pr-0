import { useParams } from "react-router";
import { SyntheticEvent, useEffect, useState } from "react"
import { Place } from "./Places";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { CustomEvent } from "./CreatePlace";

/**
 * eg route: localhost:5173/places/1234554
 */
function PlacesDetails() {

    const client = generateClient<Schema>();

    const { id } = useParams();
    const [place, setPlace] = useState<Place | undefined>(undefined)
    const [comment, setComment] = useState<string>('')

    function renderPhotos() {
        const rows: any[] = []
        if (place) {
            place.photos?.forEach((photo, index) => {
                if (photo) {
                    /**
                     * Files can be also handled with the aws-amplify/storage package:
                     * https://docs.amplify.aws/angular/build-a-backend/storage/download-files/
                     */
                    rows.push(<StorageImage path={photo} alt={photo} key={index} height={300} />)
                }
            })
        }
        return rows;
    }

    useEffect(() => {
        const handleData = async () => {
            const result = await client.models.Place.get({ id: id! })
            if (result.data) {
                setPlace(result.data)
            }
        }
        handleData();
        const sub = client.models.Place.onUpdate({
            filter: {
                id: {
                    eq: id!
                }
            }
        }).subscribe({
            next: (data)=>{
                if (data) {
                    setPlace(data)
                }
            }
        })
        return () => sub.unsubscribe();
    }, [])

    async function addComment(event: SyntheticEvent) {
        event.preventDefault();
        if (comment) {
            const currentComments = place?.comments ? place.comments : []
            console.log(currentComments)
            await client.models.Place.update({
                id: id!,
                comments: [...currentComments!, {
                    author: 'user',
                    content: comment
                }]
            })
            setComment('')
        }
    }


    return <main>
        <h2>Details for place {place?.name}</h2><br />
        <p>{place?.name}</p>
        <p>{place?.description}</p>
        {renderPhotos()}
        <br />
        <form onSubmit={(e) => addComment(e)}>
            <input onChange={(e: CustomEvent) => setComment(e.target.value)} value={comment} /><br />
            <input type="submit" value='Add comment' />
        </form>
        <p>Comments:</p>
    </main>
}

export default PlacesDetails

