import Spline from '@splinetool/react-spline';
import ReactDOM from 'react-dom';

let width = null
let height = null
let xPosition = null

export default function ({scene, onLoad, hidden}) {

    const container3d = document.querySelector(".container3d")
    const rect = container3d?.getBoundingClientRect()


    if (typeof window === "object") {
        
        if (!width) {
            width = rect?.width
            xPosition = rect?.x
        }

        if (!height || height < 400) {
            height = rect?.height
        }

        
        return ReactDOM.createPortal(
            <div className="fixed" style={{ top: rect?.y, left: xPosition, width, height, clipPath: "polygon(15% 0%, 91% 0%, 97% 100%, 3% 100%)", visibility: hidden ? "hidden" : "visible" }}>
                <Spline scene={scene} onLoad={onLoad}></Spline>
            </div>
        , document.querySelector(".crt"))
    }


}