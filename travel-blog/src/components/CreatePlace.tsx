import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { uploadData } from "aws-amplify/storage";
import { SyntheticEvent, useEffect, useState } from "react";
import { checkLoginAndGetName } from "../utils/AuthUtils";
import { NavLink } from "react-router";

export type CustomEvent = {
    target: HTMLInputElement
}

function CreatePlace() {
    const client = generateClient<Schema>().models.Place;

    const [placeName, setPlaceName] = useState<string>('');
    const [placeDescription, setPlaceDescription] = useState<string>('');
    const [placePhotos, setPlacePhotos] = useState<File[]>([]);
    const [userName, setUserName] = useState<string | undefined>()

    useEffect(() => {
        const handleData = async () => {
            const name = await checkLoginAndGetName();
            if (name) {
                setUserName(name)
            }
        }
        handleData();
    }, [])


    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        let placePhotosUrls: string[] = [];
        let placePhotosThumbsUrls: string[] = [];
        if (placeName && placeDescription) {
            if (placePhotos) {
                const uploadResult = await uploadPhotos(placePhotos)
                placePhotosUrls = uploadResult.urls;
                placePhotosThumbsUrls = uploadResult.thumbs;
            }
            const place = await client.create({
                name: placeName,
                description: placeDescription,
                photos: placePhotosUrls,
                thumbs: placePhotosThumbsUrls
            });
            console.log(place);
            if (place) {
                clearFields();
                alert(`Place with id ${place.data?.id} created`)
            }
        }
    }

    function clearFields() {
        setPlaceName('');
        setPlaceDescription('');
        setPlacePhotos([]);
    }

    function previewPhotos(event: CustomEvent) {
        if (event.target.files) {
            const eventPhotos = Array.from(event.target.files);
            const newFiles = placePhotos.concat(eventPhotos)
            setPlacePhotos(newFiles);
        }
    }

    async function uploadPhotos(files: File[]): Promise<{
        urls: string[]
        thumbs: string[]
    }> {
        const urls: string[] = [];
        const thumbs: string[] = []
        for (const file of files) {
            const result = await uploadData({
                data: file,
                path: `originals/${file.name}`
            }).result
            urls.push(result.path);
            thumbs.push(`thumbs/${file.name}`)
        }
        return {
            urls,
            thumbs
        };
    }

    function renderPhotos() {
        const photosElements: JSX.Element[] = [];
        placePhotos.map((photo: File) => {
            photosElements.push(
                <img key={photo.name} src={URL.createObjectURL(photo)} alt={photo.name} height={120} />
            )
        })
        return photosElements
    }

    function renderCreatePlaceForm() {
        if (userName) {
            return (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Place name:</label><br />
                    <input value={placeName} onChange={(e: CustomEvent) => setPlaceName(e.target.value)} /><br />
                    <label>Place description:</label><br />
                    <input value={placeDescription} onChange={(e: CustomEvent) => setPlaceDescription(e.target.value)} /><br />
                    <label>Place photos:</label><br />
                    <input type="file" multiple onChange={(e: CustomEvent) => previewPhotos(e)} /><br />
                    {renderPhotos()}<br />
                    <input type="submit" value='Create place' />
                </form>
            )
        } else {
            return <div>
                <h2>Login to create places:</h2>
                <NavLink to={"/auth"}>Login</NavLink>
            </div>
        }
    }




    return <main>
        {renderCreatePlaceForm()}
    </main>

}

export default CreatePlace