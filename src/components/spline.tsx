import React, { useEffect, useState } from 'react';
import Spline from "@splinetool/react-spline";

import ReactDOM from 'react-dom';

let width = null
let height = null
let xPosition = null

let target = null
let splineClickTimeout = null

export default function ({scene, video, onLoad, onItemSelected, hidden}) {

    let container3d = document.querySelector(".container3d")
    let rect = container3d?.getBoundingClientRect()

    const [tvEffect, setTvEffect] = useState({
        background: `repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px`,
        backgroundBlendMode: "difference",
        animation: "b .2s infinite alternate"
      })

    useEffect(() => {
        console.log("SPLINE START")
    }, [])

    function onMouseDown(e) {
        onItemSelected(e.target.name)
    }

    function onHover(e) {
        console.log("Hovering", e.target)
    }

    if (typeof window === "object") {
        
        if (!width) {
            width = rect?.width
            xPosition = rect?.x
        }

        if (!height || height < 400) {
            height = rect?.height + 40
        }
        
        window.addEventListener("resize", () => {
            container3d = document.querySelector(".container3d")
            rect = container3d?.getBoundingClientRect()

            width = rect?.width
            xPosition = rect?.x
            height = rect?.height
    
            document.querySelector(".spline-container").style.top = (rect?.y - 40) + "px"
            document.querySelector(".spline-container").style.left = xPosition + "px"
            document.querySelector(".spline-container").style.width = width + "px"
            document.querySelector(".spline-container").style.height = (height + 40) + "px"
        })

        
        return ReactDOM.createPortal(
            <div className="spline-container fixed" style={{ top: rect?.y - 40, left: xPosition, width, height, clipPath: "polygon(15% 0%, 91% 0%, 99% 100%, 0% 100%)", visibility: hidden ? "hidden" : "visible" }}>
                {
                    !video ? <Spline scene={scene} onLoad={onLoad} onMouseDown={onMouseDown} onMouseHover={onHover}></Spline>
                    : <video src={video} autoPlay muted loop></video>
                }
            </div>
        , document.querySelector(".crt"))
    }


}