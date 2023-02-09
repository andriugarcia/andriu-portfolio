

export default ({ color, name, url }) => {
    return (
        <div className="flex align-center justify-between pl-10 -mx-10 border-y-8 my-6 y-20" style={{borderColor: color, width: "calc(100% + 5rem)"}}>
            <div className="py-6">
                <div className="font-mono uppercase">Visit Page</div>
                <div className="font-black text-3xl uppercase">{name}</div>
            </div>
            <div className="w-20" style={{ backgroundColor: color }}></div>
        </div>
    )
}