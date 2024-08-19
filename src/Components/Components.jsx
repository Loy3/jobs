export const Title = (props) => {
    return (
        <div className="title">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </div>
    )
}

export const ShortTitle = (props) => {
    return (
        <div className="title">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
    )
}