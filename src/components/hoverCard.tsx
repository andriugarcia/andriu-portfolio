export default ({children, onHover}) => {
    return (
        <div className="" onMouseEnter={onHover()}>
            { children }
        </div>
    )
}