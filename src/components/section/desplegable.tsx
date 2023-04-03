import { useState } from "react"

export default ({items, color, backgroundColor}) => {

    const [selected, setSelected] = useState(0)

    return (<div className="flex">
        <div className="w-1/4 border-8 cursor-pointer" style={{borderColor: color}}>
            {
                items.map((item, index) => <button className="block w-full" onClick={() => setSelected(index)} style={{backgroundColor: selected == index ? color : backgroundColor, color: selected == index ? backgroundColor : color}}>{item.key}</button>)
            }
        </div>
        <div className="w-3/4 p-4">{items[selected].value}</div>
    </div>)
}