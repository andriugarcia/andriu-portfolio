import ReactDOM from "react-dom"
import _uniqueId from 'lodash/uniqueId';
import { gsap } from "gsap";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { log } from "console";
import { getStrapiURL } from "@/api/api";

function hoveringElement(id) {

    // if (!el.clientY) return
  
    const hoverElement = document.querySelector<HTMLElement>('.hover-container-' + id)
    const rect = hoverElement?.getBoundingClientRect()

    console.log(hoverElement, rect.y);
    
    
    // gsap.fromTo('.floating-project-' + id, {
    //   top: rect?.top,
    //   left: "-50vw"
    // },
    // {
    //   top: rect.top,
    //   left: rect.left - 300,
    //   duration: 1,
    //   ease: "Expo.easeOut"
    // })

    console.log("COMPUTED VALUE", window
    .getComputedStyle(hoverElement)
    .getPropertyValue('transform'));
    
    
    gsap.set('.floating-project-' + id + ":not(.up)", {
        top: rect.top,
        left: rect.left - 300,
        opacity: 0
    })
    gsap.set('.floating-project-' + id + ".up", {
        top: rect.top - 150,
        left: rect.left - 150,
        opacity: 0
    })

    gsap.to('.floating-project-' + id, {
        opacity: 1,
        duration: 1
    })

}

function leavingElement(id) {

    // if (!el.clientY) return
  
    const hoverElement = document.querySelector<HTMLElement>('.hover-container-' + id)
    const rect = hoverElement?.getBoundingClientRect()
    
    // gsap.to('.floating-project-' + id, {
    //   top: rect.y,
    //   left: "-50vw",
    //   duration: 1,
    //   ease: "Expo.easeOut"
    // })
    
    gsap.to('.floating-project-' + id, {
        opacity: 0,
        duration: 1
    })

}

function FloatingProject ({type, id, project, color, backgroundColor}) {
    
    let stack = ""
    if (type === "project") {
    
        project.technologies.data.forEach(tech => {
          stack += tech.attributes.name.toUpperCase() + " // "
        })
    
        useEffect(() => {
            gsap.fromTo(".floating-project-" + id + " .rotating-logo", {
                rotateX: -35,
                rotateY: 0
            }, {
                rotateX: -35,
                rotateY: 360,
                duration: 10,
                repeat: -1
            })
    
        }, [])
    }


    return ReactDOM.createPortal(
        <div className={'w-60 flex fixed' + ' floating-project-' + id + (type !== "project" ? " up" : "")} style={{transform: "rotateX(30deg)", left: "-50vw"}}>
            {
                type === "project" ? <img className="rotating-logo w-20 h-20" src={getStrapiURL(project.logo?.logo.data.attributes.url)}></img> : 
                <div className="rotating-logo h-20 w-10" style={{ backgroundColor: color }}></div>
            }
            <div className="ml-2">
                <div className="w-40 h-10 pl-2 uppercase text-lg font-black" style={{ backgroundColor, color }}>{type === "project" ? project.title : "Download Resumé"}</div>
                <div className="w-40 h-5 mb-2" style={{ backgroundColor, color }}>
                {
                    type === "project" ? <Marquee className='marquee font-mono' gradient={false} speed={40} style={{color, fontSize: '10px'}}>{stack}</Marquee> : ""
                }
                </div>
                <div className="w-10 h-10 border-2 absolute top-20 right-10" style={{ backgroundColor: color, borderColor: backgroundColor }}></div>
                <div className="w-5 h-5 border-2 absolute -bottom-30 left-8" style={{ backgroundColor: color, borderColor: backgroundColor }}></div>
                <div className="w-10 h-10 border-2 absolute -bottom-20 left-5" style={{ backgroundColor: color, borderColor: backgroundColor }}></div>
            </div>
            <div className="h-20 w-10" style={{ backgroundColor: color }}></div>
            
        </div>
    , document.querySelector(".crt"))
}

export default ({children, type, project, color, backgroundColor, y}) => {

    const id = _uniqueId()

    return (
        <div className={'hover-container-' + id + (y ? '' : ' static')} style={{ transform: type === "project" && y ? `translateY(${y}px)` : "" }} onMouseOver={() => hoveringElement(id)} onMouseLeave={() => leavingElement(id)}>
            { children }
            <FloatingProject id={id} type={type} project={project} color={color} backgroundColor={backgroundColor}></FloatingProject>
        </div>
    )
}