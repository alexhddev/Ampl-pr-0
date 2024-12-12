import { NavLink } from "react-router";
import { type Place } from "./Places";
import { StorageImage } from '@aws-amplify/ui-react-storage';



export default function PlaceComponent(props: {
    place: Place
}) {

    function renderPhotos(){
        const rows: any[] = []
        props.place.thumbs?.forEach((photo, index) => {
            if(photo){
                /**
                 * Files can be also handled with the aws-amplify/storage package:
                 * https://docs.amplify.aws/angular/build-a-backend/storage/download-files/
                 */
                rows.push(<StorageImage path={photo} alt={photo} key={index}/>)
            }
        })
        return rows;
    }

    return <div className="placeComponent">
        <h1>{props.place.name}</h1>
        <NavLink to={'/places/' + props.place.id}>{props.place.name}</NavLink>
        <p>{props.place.description}</p>
        {renderPhotos()}
    </div>

}