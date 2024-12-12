import { type Place } from "./Places";



export default function PlaceComponent(props: {
    place: Place
}) {

    function renderPhotos(){
        const rows: any[] = []
        props.place.thumbs?.forEach((photo, index) => {
            if(photo){
                rows.push(<img src={photo} key={index} />)
            }
        })
        return rows;
    }

    return <div className="placeComponent">
        <h1>{props.place.name}</h1>
        <p>{props.place.description}</p>
        {renderPhotos()}
    </div>

}