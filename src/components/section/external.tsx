import { gsap } from "gsap";
import Image from 'next/image';



export default ({ color, backgroundColor, name, url }) => {
    
    function hoverExternal() {
        // gsap.set(".external-arrow-up, .external-arrow-right, .external-arrow-left", {opacity: 1})
        // gsap.to(".external-arrow-up", {
        //     y: "-40vh",
        //     duration: 1,
        //     ease: "Back.easeOut"
        // }
        // )
        // gsap.to(".external-arrow-left", {
        //     x: "-30vw",
        //     y: "-30vh",
        //     duration: 1,
        //     ease: "Back.easeOut"
        // }
        // )
        // gsap.to(".external-arrow-right", {
        //     x: "+30vw",
        //     y: "-30vh",
        //     duration: 1,
        //     ease: "Back.easeOut"
        // }
        // )

        gsap.to(".external-overlay", {
            clipPath: "inset(0 0 0 0%)",
            duration: 1,
            ease: "Expo.easeOut"
        })
    }

    function unhoverExternal() {
        gsap.to(".external-overlay", {
            clipPath: "inset(0 0 0 100%)",
            duration: 1,
            ease: "Expo.easeOut"
        })
        // gsap.to(".external-arrow-up", {
        //     x: 0,
        //     y: 0,
        //     xPercent: -50,
        //     yPercent: -50,
        //     duration: 1,
        // })
        // gsap.to(".external-arrow-left", {
        //     x: 0,
        //     y: 0,
        //     xPercent: -50,
        //     yPercent: -50,
        //     duration: 1,
        // })
        // gsap.to(".external-arrow-right", {
        //     x: 0,
        //     y: 0,
        //     xPercent: -50,
        //     yPercent: -50,
        //     duration: 1,
        // })
    }

    return (
        <a href={url} target="_blank" onMouseOver={hoverExternal} onMouseLeave={unhoverExternal} className="relative flex align-center justify-between pl-12 -mx-10 border-y-8 y-20" style={{borderColor: color, width: "calc(100% + 6rem)"}}>
            <div className="py-6">
                <div className="font-mono uppercase">Visit Page</div>
                <div className="font-black text-3xl uppercase">{name}</div>
                <div className="w-28 absolute top-8 right-0 overflow-hidden">
                <svg width="48" height="48" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" style={{ fill: color }}>
                    <g fill-rule="evenodd">
                    <path d="m132.39 547.11-49.496-49.496 494.98-494.98 49.496 49.496z"/>
                    <path d="m560 525v-525h70v525z"/>
                    <path d="m105 70v-70h525v70z"/>
                    </g>
                </svg>
                </div>
            </div>
            <div className="absolute external-overlay inset-0 flex align-center justify-between y-20" style={{ paddingLeft: "5.5rem", backgroundColor: color, color: backgroundColor, clipPath: "inset(0 0 0 100%)" }}>
                <div className="pt-6" style={{ marginLeft: "-2.5rem" }}>
                    <div className="font-mono uppercase">Visit Page</div>
                    <div className="font-black text-3xl uppercase">{name}</div>
                </div>
                <div className="w-28 absolute top-8 right-0 overflow-hidden">
                <svg width="48" height="48" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" style={{ fill: backgroundColor }}>
                    <g fill-rule="evenodd">
                    <path d="m132.39 547.11-49.496-49.496 494.98-494.98 49.496 49.496z"/>
                    <path d="m560 525v-525h70v525z"/>
                    <path d="m105 70v-70h525v70z"/>
                    </g>
                </svg>
                </div>

            </div>
        </a>
    )
}