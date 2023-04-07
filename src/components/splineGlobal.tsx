import React, { useEffect, useState } from 'react';
import Spline from "@splinetool/react-spline";

let width = null
let height = null
let xPosition = null
let yPosition = null

let target = null
let splineClickTimeout = null

export default function ({scene, onLoad, onItemSelected, hidden}) {

    const [tvEffect, setTvEffect] = useState({
        background: `repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px`,
        backgroundBlendMode: "difference",
        animation: "b .2s infinite alternate"
    })

    let rect = null
    
    function onMouseDown(e) {
        console.log(e.target.name);
        
        onItemSelected(e.target.name)
    }

    function onMouseMove() {
    }

    function onHover(e) {
    }
    
    useEffect(() => {
        let container3d = document.querySelector(".container3d")
        console.log("CONTAINER3D", document.querySelector(".container3d"));
        
        rect = container3d?.getBoundingClientRect()

        console.log("HIDDEN", hidden, document)

            
        if (!width) {
            width = rect?.width
            xPosition = rect?.x
        }

        if (!height || height < 400) {
            height = rect?.height + 40
        }
        
        // window.addEventListener("resize", () => {
        container3d = document.querySelector(".container3d")
        rect = container3d?.getBoundingClientRect()

        console.log("RECT", rect);
        

        width = rect?.width
        xPosition = rect?.x
        yPosition = rect?.y
        height = rect?.height

    }, [])
        
    console.log(scene, onLoad, onMouseDown, onHover);
    
        return (
            <div className="spline-container fixed" style={{ top: yPosition, left: xPosition, width, height, clipPath: "polygon(15% 0%, 91% 0%, 99% 100%, 0% 100%)", visibility: hidden ? "hidden" : "visible" }}>
                <Spline scene={scene} onLoad={onLoad} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseHover={onHover}></Spline>
            </div>
        )


}