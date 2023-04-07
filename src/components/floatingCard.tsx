import { useEffect } from "react";
import ReactDOM from "react-dom";
import Marquee from "react-fast-marquee";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function({project, color, backgroundColor}) {
    console.log("Floating Card started");
    const router = useRouter()
    useEffect(() => {
        const distance = window.innerWidth - document.querySelector("main")?.getBoundingClientRect().right
        gsap.to(".floatingCard", {
          right: distance -100,
          top: 0.6 * window.innerHeight,
          zIndex: 20,
          rotation: -18,
        })
    }, [router.asPath])

    if (typeof window === "object") {
        return ReactDOM.createPortal(
            <div className='floatingCard fixed w-[250px] h-[500px]' style={{backgroundColor: color, right: "-60vw", bottom: 0, transform: "rotateX(30deg)"}}>
                <Marquee className='font-mono uppercase' gradient={false} speed={50} style={{color: backgroundColor, width: "calc(100% - 20px)"}}>{project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} --</Marquee>
                <div className='absolute' style={{top: "calc(50% - 20px)", transform: "translateX(-1px)"}}>
                <Marquee className='font-mono uppercase' gradient={false} speed={25} style={{color: backgroundColor, width: "calc(500px - 20px)", transform: "rotate(90deg)"}}>{project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} --</Marquee>
                </div>
                <div className='absolute' style={{left: "-100%", top: "50%", transform: "translateX(19px)"}}>
                <Marquee className='font-mono uppercase' gradient={false} speed={25} style={{color: backgroundColor, width: "calc(500px - 20px)", transform: "rotate(-90deg)"}}>{project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} --</Marquee>
                </div>
                <div className='absolute' style={{top: "100%", transform: "translate(20px, -100%)"}}>
                <Marquee className='font-mono uppercase' gradient={false} speed={50} style={{color: backgroundColor, width: "calc(100% - 20px)", transform: "rotate(180deg)"}}>{project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} -- {project.title} --</Marquee>
                </div>
                <p className='absolute font-bold inset-[26px] text-2xl uppercase' style={{ color: backgroundColor, textAlign: "justify" }}>{ project.description }</p>
          </div>
        , document.querySelector(".crt"))
    }
}