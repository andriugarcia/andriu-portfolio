export default ({src, className, style, caption}) => {

    return <div>
        <img src={src} className={className} style={style}></img>
        {
            caption ? <div className="mt-2">{caption}</div> : ""
        }
    </div>
}