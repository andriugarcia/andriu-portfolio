import Spline from '@splinetool/react-spline';
import ReactDOM from 'react-dom';


export default function ({scene, onLoad, hidden}) {

    const container3d = document.querySelector(".container3d")
    const rect = container3d?.getBoundingClientRect()

    console.log(rect);
    

    if (typeof window === "object") {
        return ReactDOM.createPortal(
            <div className="fixed" style={{ top: rect?.y, left: rect?.x, width: rect?.width, height: rect?.height, clipPath: "inset(0)", visibility: hidden ? "hidden" : "visible" }}>
                <Spline scene={scene} onLoad={onLoad}></Spline>
            </div>
        , document.querySelector(".crt"))
    }


}