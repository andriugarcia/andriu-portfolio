import { useEffect } from "react"
import { gsap } from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faArrowDown,
  } from "@fortawesome/free-solid-svg-icons";



export default ({color, backgroundColor}) => {

    useEffect(() => {
        gsap.fromTo(".scroll-cursor-arrows", {
            yPercent: -46
        },
        {
            yPercent: 6,
            duration: 1,
            ease: "linear",
            repeat: -1
        })
    }, [])

    return (
        <div className="scroll-cursor fixed cursor top-0 left-0 pointer-events-none">
            <div className="relative overflow-y-hidden w-[120px] h-[120px] rounded-full" style={{ backgroundColor: color }}>
                <div className="scroll-cursor-arrows absolute top-[0%] left-[50%]">
                    <FontAwesomeIcon
                        className="my-2"
                        icon={faArrowDown}
                        style={{ fontSize: 80, color: backgroundColor, transform: "translate(-50%, 0)" }}
                    />
                    <FontAwesomeIcon
                        className="my-2"
                        icon={faArrowDown}
                        style={{ fontSize: 80, color: backgroundColor, transform: "translate(-50%, 0)" }}
                    />
                </div>
            </div>
            <div className='circleText autoRotate absolute top-0 left-0'>
                <p className='uppercase text-mono'>{
                `SCROLL · SCROLL · SCROLL · SCROLL · SCROLL · SCROLL · `.split("").map((char, i) => <span style={{ color, transform: "rotate(" + ((i * 360)/(("SCROLL · ".length*6+3))) + "deg" }}>{char}</span>)  
                }</p>
            </div>
        </div>
    )
}