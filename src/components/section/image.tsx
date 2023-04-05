export default ({src, className, style, caption}) => {

    return <div>
        <img src={src} className={className} style={style}></img>
        {
            caption ? <p className="mt-2 text-small w-40">{caption}</p> : ""
        }
    </div>
}