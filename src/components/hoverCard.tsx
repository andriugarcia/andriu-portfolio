import ReactDOM from "react-dom"
import _uniqueId from 'lodash/uniqueId';
import { gsap } from "gsap";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";

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
    
    gsap.set('.floating-project-' + id, {
        top: rect.top,
        left: rect.left - 300,
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

function FloatingProject ({id, project, color, backgroundColor}) {
    return ReactDOM.createPortal(
        <div className={'w-60 flex fixed' + ' floating-project-' + id} style={{transform: "rotateX(30deg)", left: "-50vw"}}>
            <div className="mr-2">
                <div className="w-40 h-10 mb-2" style={{ backgroundColor: color }}>
                <Marquee className='marquee' gradient={false} speed={40} style={{color: backgroundColor, fontSize: '20px'}}>GO TO PROJECT · GO TO PROJECT · GO TO PROJECT ·</Marquee>
                </div>
                <div className="w-40 h-10 pl-2 border-4 uppercase text-lg font-black" style={{ backgroundColor, color, borderColor: color }}>{project.title}</div>
            </div>
            <div className="h-20 w-10" style={{ backgroundColor: color }}></div>
            
        </div>
    , document.querySelector(".crt"))
}

export default ({children, project, color, backgroundColor}) => {

    const id = _uniqueId()

    return (
        <div className={'hover-container-' + id} onMouseOver={() => hoveringElement(id)} onMouseLeave={() => leavingElement(id)}>
            { children }
            <FloatingProject id={id} project={project} color={color} backgroundColor={backgroundColor}></FloatingProject>
        </div>
    )
}