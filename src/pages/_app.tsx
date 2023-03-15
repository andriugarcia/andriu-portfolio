import '@/styles/globals.css'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { League_Spartan } from '@next/font/google'
const league = League_Spartan({ subsets: ['latin'], variable: '--font-league-spartan' })

import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";

import styles from '@/styles/Home.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useState } from 'react'
import { fetchAPI, getStrapiURL } from '@/api/api'
import App from 'next/app'
import { getStrapiMedia } from '@/api/media'
import { log } from 'console'
import hexToFilter from '@/api/color'
import HoverCard from '@/components/hoverCard'

config.autoAddCss = false;

let loaded = false

function mod(value, module) {
  return ((value % module) + module) % module
}

function clickTerminal(e) {
  if (!loaded) return
  const terminalElement = document.getElementById("terminal")
  var rect = terminalElement.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element.

  console.log("CLICK", (x / terminalElement.offsetWidth));
  

  gsap.to("#terminal", {
    rotateX: 35 - ((y / terminalElement.offsetHeight) - 0.5) * 3,
    rotateY: ((x / terminalElement.offsetWidth) - 0.5) * 5,
    duration: 0.2,
    repeat: 1,
    ease: "Power1.easeOut",
    overwrite: true,
    yoyo: true
  })

}

function overTerminal(e) {
  // e = Mouse click event.
  const terminalElement = document.getElementById("terminal")
  var rect = terminalElement.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element.

  const gridmap = document.querySelector(".gridmap")

  if (loaded) {
    gridmap.style.transform = `rotateX(35deg) translate(${(x / terminalElement.offsetWidth) * 20}px, ${(y / terminalElement.offsetHeight) * 20}px)`
  }

}

const positionElement = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  const cursor = document.querySelector<HTMLElement>(".cursor")

  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

}

function MyApp({ Component, pageProps, projects }) {
  const [backgroundColor, setBackgroundColor] = useState("")
  const [color, setColor] = useState("")
  const [scrollbarStyle, setScrollbarStyle] = useState({ "--background-color": "#FFF", "--color": "#000" } as React.CSSProperties)

  const [onTransition, setTransition] = useState(true)
  const [logoMultiplyColor, setLogoMultiplyColor] = useState("none")
  const [iconList, setIconList] = useState([])

  const[started, setStarted] = useState(false)

  const router = useRouter() 

  let project = null
  let index = -1

  if (router.pathname !== '/' && router.pathname !== '/404') {
    index = projects.findIndex((p => p.attributes.title.toLowerCase() === router.query.project))
    project = projects[index].attributes
  } else {
    project = {
      color: "#FFFCF6",
      backgroundColor: "#1F1B20",
      title: "ANDRIU GARCIA"
    }
  }

  useEffect(() => {
    const startingPosition = index !== -1 ? index : 0

    const values = Object.values(projects)
    const length = values.length

    const list = []

    for(let i = -4; i <= 4; i += 1) {
      list.push(values[mod(startingPosition+i, length)])
    }
    
    setIconList(list)

    window.addEventListener('mousemove', positionElement)

    gsap.set("#terminal, .gridmap", {
      rotateX: 90
    })

    gsap.fromTo(".horizon-line", {
      width: 0
    }, {
      width: "100%",
      duration: 1,
      delay: 0.5,
      ease: "Expo.easeOut"
    })
    
    gsap.fromTo('.preloader-char', {
      yPercent: 110
    }, {
      yPercent: 0,
      duration: 1,
      stagger: {
        from: "center",
        amount: 0.2
      },
      delay: 1,
      ease: 'Expo.easeOut',
    })
  }, [])

  useEffect(() => {

    setTransition(true)
    
    setBackgroundColor(project?.color || "#FFFCF6")
    setColor(project?.secondaryColor || "#1F1B20")
    setScrollbarStyle({ "--background-color": project?.secondaryColor, "--color": project?.color, backgroundColor: project?.color } as React.CSSProperties)

    gsap.fromTo('.title-char', {
      yPercent: 110
    }, {
      yPercent: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'Expo.easeInOut',
    })

    gsap.fromTo('.highlight', {
      y: '100vh'
    }, {
      y: 0,
      duration: 1,
      ease: 'Expo.easeInOut',
      stagger: 0.10
    })

    const filterStyle = hexToFilter(project?.color)

    console.log(filterStyle);

    setLogoMultiplyColor(filterStyle.filter)

    const blinkingElements = gsap.utils.toArray("section img, section video")

    // blinkingElements.forEach(el => {
    //   gsap.from(el, {
    //     scrollTrigger: {
    //       start: 'top bottom',
    //       end: 'bottom top',
    //       trigger: el,
    //       toggleClass: 'blink'
    //     }
    //   });
    // });
    }, [router.asPath])

    function startApp() {
      gsap.set(".preloader", {opacity: 0})  
      gsap.to(".cursor", {
        rotateX: 35,
        duration: 1,
        ease: "Expo.easeOut"
      })
      gsap.fromTo("#terminal", {
          rotateX: 90
        },
        {
          rotateX: 35,
          duration: 1,
          ease: "Back.easeOut",
          onComplete: () => {loaded = true}
        })
        gsap.fromTo(".gridmap", {
          rotateX: 90
        },
        {
          rotateX: 35,
          duration: 1,
          ease: "Expo.easeOut",
        })
    
        setStarted(true)
    }

  function goToProject(project, indexTarget = -1) {
    if (onTransition) return
    if (project === "next") {
      indexTarget = index + 1
      project = iconList[indexTarget]
    } else if (project === "previous") {
      indexTarget = index - 1
      project = iconList[indexTarget]
    }

    const steps = indexTarget - 4

    const iconHeight = document.querySelector(".icon").offsetHeight + 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)

    gsap.to(`*[class^="hover-container-"]`, {
      y: iconHeight * -steps,
      duration: 1
    })
  
    if(typeof window !== 'undefined') {

      const path = '/' + project.attributes.title.replaceAll(" ", "").toLowerCase()

      router.prefetch(path)

      setTransition(true)

      gsap.fromTo('.highlight', {
        y: 0
      }, {
        y: '-100vh',
        duration: 1,
        ease: 'Expo.easeInOut',
        stagger: 0.10
      })

      gsap.fromTo('.title-char', {
        yPercent: 0
      }, {
        yPercent: 110,
        duration: 1,
        ease: 'Expo.easeInOut',
        stagger: 0.05,
        onComplete: () => router.push(path)
      })

      gsap.to(".floatingCard", {
        right: -250,
        bottom: -37,
        rotation: 0,
      })

      const timeline = gsap.timeline()
      const tvOffElement = document.querySelector(".tv-off")
      const tvOffRect = tvOffElement?.getBoundingClientRect()
      const scrollArea = document.querySelector("#scrollarea")

      if (scrollArea && scrollArea.scrollTop > 50) {
        timeline.set(".tv-off", {
          zIndex: 5000,
          display: "initial",
        })
        timeline.to(".tv-off__top, .tv-off__bottom", {
          height: "50%",
          duration: .5,
          ease: "Expo.easeOut"
        })
      }
      

    }
  }
  return (
    <>
      <div className={`crt h-[100vh] p-10 ${league.variable} overflow-hidden flex justify-center`} style={ scrollbarStyle } onMouseMove={(e) => overTerminal(e)}>
        
        <div className='gridmap fixed inset-[-500px]' style={{  transform: "rotateX(30deg)", filter: "blur(1px)", backgroundSize: "40px 40px", borderRight: `1px solid ${color}`, backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`}}></div>
        {/* <div className='hoverElement fixed w-60 h-20' style={{transform: "rotateX(30deg)", backgroundColor: "red", zIndex: 3000}}></div> */}
        <FontAwesomeIcon
          icon={faChevronUp}
          className="external-arrow-up fixed"
          style={{ fontSize: 420, color: color, top: "50vh", left: "50vw", opacity: 0, transform: "translate(-50%, -50%) rotateX(35deg)" }}
        />
        <FontAwesomeIcon
          icon={faChevronUp}
          className="external-arrow-left fixed"
          style={{ fontSize: 420, color: color, top: "50vh", left: "50vw", opacity: 0, transform: "translate(-50%, -50%) rotate(-45deg) rotateX(35deg)" }}
        />
        <FontAwesomeIcon
          icon={faChevronUp}
          className="external-arrow-right fixed"
          style={{ fontSize: 420, color: color, top: "50vh", left: "50vw", opacity: 0, transform: "translate(-50%, -50%) rotate(45deg) rotateX(35deg)" }}
        />


        <div className='preloader fixed top-[50%] left-0 right-0 w-full flex flex-col items-center '>
          <div className='overflow-hidden text-4xl font-black uppercase flex' style={{ color }}>
            {
              "ADDING A NEW PERSPECTIVE TO WEB DEVELOPMENT".split("").map((char: String) => (<div className='preloader-char' style={{marginRight: char == ' ' ? "12px" : "0"}}>{char}</div>))
            }
          </div>
          <div className='horizon-line w-0 h-2 my-2' style={{ backgroundColor: color }}></div>
          <button className='start-button pa-2 font-mono font-bold' onClick={() => startApp()} style={{ color, letterSpacing: 0.5 }}> START</button>
        </div>

        <div id="terminal" className='relative h-full w-full border-8' onClick={(e) => clickTerminal(e)} style={{ borderColor: color, maxWidth: 1273, backgroundColor, transform: "rotateX(30deg)" }}>
          <div id="navbar" className="absolute top-0 left-0 right-0 h-20 border-b-8 flex items-center justify-start" style={{ borderColor: color }}>
          <Link className='relative h-full aspect-square w-20 border-r-8' href="/" style={{ borderColor: color}}>
            <div className='logo' style={{filter: logoMultiplyColor }}></div>
          </Link>
          <h2 style={{color: color}} className='ml-5 font-black text-4xl flex overflow-hidden'>ANDRIU GARCIA {project && project.title !== "ANDRIU GARCIA" ? <div className='ml-2 navbarProjectTitle'>✕ {project.title.toUpperCase()}</div> : ''}</h2>
          <div className='grow'></div>
          <div className='mr-10 flex gap-3'>
            <a href="/resume" className="font-mono" style={{ color: color }}>RESUME</a>
            <a href="/contact" className="font-mono" style={{ color: color }}>CONTACT</a>
          </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 mt-[80px] w-20 border-r-8 flex flex-col gap-y-10 justify-center items-center" style={{ borderColor: color }}>
            {
              project && project.title !== "ANDRIU GARCIA" ? <div className='absolute w-full h-16 top-[50%]' style={{ backgroundColor: color, transform: "translateY(-50%)" }}></div> : ""
            }
            <FontAwesomeIcon
              onClick={() => goToProject("next")}
              icon={faChevronUp}
              className="absolute top-[20px]"
              style={{ fontSize: 36, color: color }}
            />
            <div style={{height: "calc(200px + 12.5rem)", width: "100%", clipPath: "inset(0 0 0 0)"}}>
              <div className='absolute top-0 bottom-0 left-[16px] flex flex-col gap-y-10 justify-center items-center'>
                {
                  iconList.map((item, index) => {
                    return (<HoverCard project={item?.attributes} type="project" color={color} backgroundColor={backgroundColor}>
                      <div className='icon w-10 h-10'><img src={getStrapiURL(item?.attributes?.logo?.logo.data.attributes.url)} onClick={() => goToProject(item, index)} className='w-10 h-10 z-10'></img></div>
                    </HoverCard>)
                  })
                }
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => goToProject("previous")}
              icon={faChevronDown}
              className="absolute bottom-[20px]"
              style={{ fontSize: 36, color: color }}
            />
          </div>
          <div className="relative ml-20 mt-20" style={{height: 'calc(100% - 5rem)'}}>
            <div className='absolute tv-off inset-0 overflow-hidden' style={{ display: "none" }}>
              <div className='tv-off__top absolute top-0 left-0 right-0 w-full h-0' style={{backgroundColor}}></div>
              <div className='tv-off__bottom absolute bottom-0 left-0 right-0 w-full h-0' style={{backgroundColor}}></div>
            </div>
            {
              started ? <Component {...pageProps} goToProject={() => goToProject("next")} onTransition={onTransition} setTransition={setTransition}/> : ""
            }
          </div>
        </div>

        <svg className='fixed cursor' width="42" height="42" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="m458.42 532.46h-201.94l-140.12-149.58-1.5547-110.26h97.816l-0.003907-253.58h116.41v156.58h195.37l36.508 54.562v199.8zm-193.83-18.723h176.61l-27.738-27.742-175.41-0.60547zm166.01-37.086 28.57 28.59 83.016-83.008v-2.8906l-27.148-27.148zm-204.71-10.02 187.62 0.64844 92.176-92.188v-180.75h-78.961v87.629h-18.723l0.003906-87.629h-78.973v87.629h-18.715v-244.21h-78.977v293.5h-18.723v-39.922h-78.828l1.1797 83.719zm298.52-91.543 17.785 17.785v-156.1l-17.422-27.715z"/>
            <use x="70" y="644"/>
            <use x="90.550781" y="644"/>
            <use x="104.359375" y="644"/>
            <use x="123.347656" y="644"/>
            <use x="142.242188" y="644"/>
            <use x="155.628906" y="644"/>
            <use x="174.617188" y="644"/>
            <use x="204.410156" y="644"/>
            <use x="224.453125" y="644"/>
            <use x="252.453125" y="644"/>
            <use x="265.835938" y="644"/>
            <use x="285.769531" y="644"/>
            <use x="304.664062" y="644"/>
            <use x="333.839844" y="644"/>
            <use x="343.4375" y="644"/>
            <use x="70" y="672"/>
            <use x="82.183594" y="672"/>
            <use x="95.992188" y="672"/>
            <use x="115.226562" y="672"/>
            <use x="154.152344" y="672"/>
            <use x="167.535156" y="672"/>
            <use x="187.46875" y="672"/>
            <use x="216.207031" y="672"/>
            <use x="239.640625" y="672"/>
            <use x="258.878906" y="672"/>
            <use x="278.8125" y="672"/>
            <use x="308.492188" y="672"/>
            <use x="329.015625" y="672"/>
            <use x="342.820312" y="672"/>
            <use x="362.058594" y="672"/>
            <use x="371.65625" y="672"/>
            <use x="390.648438" y="672"/>
            <use x="407.242188" y="672"/>
          </g>
          </svg>

      </div>
    </>
    
  )
}

// export async function getStaticProps() {
//   // Run API calls in parallel

//   return {
//     props: {
//       projects: projectsRes.data,
//     },
//   };
// }

MyApp.getInitialProps = async (ctx) => {

  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);

  // Fetch global site settings from Strapi
  const [globalRes, projectsRes] = await Promise.all([fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  }),
  fetchAPI("/projects", { populate: {
    logo: {
      populate: {
        logo: "*",
      },
    },
    content: {
      populate: "*",
    },
    technologies: {
      populate: {
        icon: "*"
      }
    }
  } }),
])


  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data }, projects: projectsRes.data};
};

export default MyApp;
