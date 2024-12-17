


export default function Comment(props: {
    author: string | null | undefined,
    content: string | null | undefined
}) {

    return <div>
        <p>
            <b>{props.author}:</b>&nbsp;
            {props.content}
        </p>
    </div>

}