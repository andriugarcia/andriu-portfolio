import React, { Suspense, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

let width = null
let height = null
let xPosition = null
let yPosition = null

let target = null
let splineClickTimeout = null
let rect = null

function onMouseDown(e) {
    console.log(e.target.name);
    
    onItemSelected(e.target.name)
}
export default function ({scene, onLoad, onItemSelected, hidden}) {
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
    
        return (
            <div className="spline-container fixed" style={{ top: yPosition, left: xPosition, width, height, clipPath: "polygon(15% 0%, 91% 0%, 99% 100%, 0% 100%)", visibility: hidden ? "hidden" : "visible" }}>
                <Spline scene={scene} onLoad={onLoad} onMouseDown={onMouseDown}></Spline>
            </div>
        )


}