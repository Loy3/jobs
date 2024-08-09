export const Title = (props) => {
    return (
        <div className="title">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </div>
    )
}