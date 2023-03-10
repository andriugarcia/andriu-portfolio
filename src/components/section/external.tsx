import { gsap } from "gsap";

export default ({ color, name, url }) => {
    
    function hoverExternal() {
        gsap.set(".external-arrow-up, .external-arrow-right, .external-arrow-left", {opacity: 1})
        gsap.to(".external-arrow-up", {
            y: "-40vh",
            duration: 1,
            ease: "Back.easeOut"
        }
        )
        gsap.to(".external-arrow-left", {
            x: "-30vw",
            y: "-30vh",
            duration: 1,
            ease: "Back.easeOut"
        }
        )
        gsap.to(".external-arrow-right", {
            x: "+30vw",
            y: "-30vh",
            duration: 1,
            ease: "Back.easeOut"
        }
        )
    }

    function unhoverExternal() {
        gsap.to(".external-arrow-up", {
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 1,
        })
        gsap.to(".external-arrow-left", {
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 1,
        })
        gsap.to(".external-arrow-right", {
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 1,
        })
    }

    return (
        <div onMouseOver={hoverExternal} onMouseLeave={unhoverExternal} className="flex align-center justify-between pl-10 -mx-10 border-y-8 my-6 y-20" style={{borderColor: color, width: "calc(100% + 5rem)"}}>
            <div className="py-6">
                <div className="font-mono uppercase">Visit Page</div>
                <div className="font-black text-3xl uppercase">{name}</div>
            </div>
            <div className="w-20" style={{ backgroundColor: color }}></div>
        </div>
    )
}