import Spline from '@splinetool/react-spline';
import ReactDOM from 'react-dom';

let width = null
let height = null
let xPosition = null

export default function ({scene, onLoad, hidden}) {

    const container3d = document.querySelector(".container3d")
    const rect = container3d?.getBoundingClientRect()
    const widthOffset = 150


    if (typeof window === "object") {
        
        if (!width) {
            width = rect?.width - widthOffset
            xPosition = rect?.x + (widthOffset / 2)
        }

        if (!height || height < 80) {
            height = rect?.height
        }

        
        return ReactDOM.createPortal(
            <div className="fixed" style={{ top: rect?.y, left: xPosition, width, height, clipPath: "inset(0)", visibility: hidden ? "hidden" : "visible" }}>
                <Spline scene={scene} onLoad={onLoad}></Spline>
            </div>
        , document.querySelector(".crt"))
    }


}