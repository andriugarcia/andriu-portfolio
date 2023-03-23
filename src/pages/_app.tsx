import '@/styles/globals.css'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { League_Spartan } from '@next/font/google'
const league = League_Spartan({ subsets: ['latin'], variable: '--font-league-spartan' })

import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config, icon } from "@fortawesome/fontawesome-svg-core";

import styles from '@/styles/Home.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useRef, useState } from 'react'
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
  const mouseY = e.clientY - 5;
  const mouseX = e.clientX - 10;

  const cursor = document.querySelector<HTMLElement>(".cursor")

  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

}

function MyApp({ Component, pageProps, projects }) {
  const [backgroundColor, setBackgroundColor] = useState("")
  const [color, setColor] = useState("")
  const [scrollbarStyle, setScrollbarStyle] = useState({ "--background-color": "#FFF", "--color": "#000" } as React.CSSProperties)
  const [iconHeight, setIconHeight] = useState(102)
  const [onTransition, setTransition] = useState(true)
  const [logoMultiplyColor, setLogoMultiplyColor] = useState("none")
  const [iconList, setIconList] = useState([])

  const[started, setStarted] = useState(false)

  const projectSelector = useRef(null)

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

  let scrollIndex = 4

  function goToProject(project, indexTarget = -1) {
    console.log(index);
    
    if (onTransition) return
    if (project === "next") {
      indexTarget = scrollIndex + 1
      project = iconList[indexTarget]
    } else if (project === "previous") {
      indexTarget = scrollIndex - 1
      project = iconList[indexTarget]
    }

    const steps = indexTarget - 4

    // const iconHeight = document.querySelector(".icon").offsetHeight + 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    // setIconHeight(projectSelector.current.offsetHeight - 113)

    // console.log("ICON HEIGHT", projectSelector.current.offsetHeight - 113);
    

    if (steps > 0) {
      setIconList([...iconList.slice(steps), ...iconList.slice(0, steps)])
    } else {
      setIconList([...iconList.slice(iconList.length + steps), ...iconList.slice(0, iconList.length + steps)])
    }

    console.log(iconHeight, steps);

    gsap.from(`*[class^="hover-container-"]:not(.static)`, {
      y: "-=" + (iconHeight * -steps) + "px",
      duration: 1,
      stagger: 0.05,
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
      <div className={`crt h-[100vh] cursor-none p-10 ${league.variable} overflow-hidden flex justify-center`} style={ scrollbarStyle } onMouseMove={(e) => overTerminal(e)}>
        
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
          {
            !started ? "" : <div className='mr-10 flex gap-3'>
              <HoverCard type="resume" color={color} backgroundColor={backgroundColor}>
                <a href="/resume" className="font-mono" style={{ color: color }}>RESUME</a>
              </HoverCard>
              <HoverCard type="contact" color={color} backgroundColor={backgroundColor}>
                <a href="mailto:contacto@andriugarcia.com" className="font-mono" style={{ color: color }}>CONTACT</a>
              </HoverCard>
            </div>
          }
          </div>
          <div ref={projectSelector} className="absolute top-0 bottom-0 left-0 mt-[80px] w-20 border-r-8 flex flex-col gap-y-10 justify-center items-center" style={{ borderColor: color }}>
            {
              project && project.title !== "ANDRIU GARCIA" ? <div className='absolute w-full h-16 top-[50%]' style={{ backgroundColor: color, transform: "translateY(-50%)" }}></div> : ""
            }
            {
              !started ? "" : <HoverCard project={projects[mod((index-1), projects.length)].attributes} type="project" y={null} color={color} backgroundColor={backgroundColor}>
              <FontAwesomeIcon
                onClick={() => goToProject("previous")}
                icon={faChevronUp}
                className="absolute top-[20px] right-[18px]"
                style={{ fontSize: 36, color: color }}
              />
            </HoverCard>
            }
            <div style={{height: iconHeight * 5, width: "100%", clipPath: "inset(0 0 0 0)"}}>
              <div className='absolute top-0 bottom-0 left-[16px] gap-y-10'>
                {
                  iconList.map((item, index) => {
                    return (<HoverCard project={item?.attributes} type="project" y={index * (iconHeight)} color={color} backgroundColor={backgroundColor}>
                      <div className='absolute top-0 icon w-10 h-10'><img src={item?.attributes?.logo?.logo} onClick={() => goToProject(item, index)} className='w-10 h-10 z-10'></img></div>
                    </HoverCard>)
                  })
                }
              </div>
            </div>
            {
              !started ? "" : <HoverCard project={projects[mod((index+1), projects.length)].attributes} type="project" y={null} color={color} backgroundColor={backgroundColor}>
              <FontAwesomeIcon
                onClick={() => goToProject("next")}
                icon={faChevronDown}
                className="absolute bottom-[20px] right-[18px]"
                style={{ fontSize: 36, color: color }}
              />
            </HoverCard>
            }
          </div>
          <div className="relative ml-20 mt-20" style={{height: 'calc(100% - 5rem)'}}>
            <div className='absolute tv-off inset-0 overflow-hidden' style={{ display: "none" }}>
              <div className='tv-off__top absolute top-0 left-0 right-0 w-full h-0' style={{backgroundColor}}></div>
              <div className='tv-off__bottom absolute bottom-0 left-0 right-0 w-full h-0' style={{backgroundColor}}></div>
            </div>
            {
              started ? <Component {...pageProps} goToProject={() => goToProject("next")} onTransition={onTransition} setTransition={setTransition} nextProject={projects[mod((index+1), projects.length)].attributes}/> : ""
            }
          </div>
        </div>

        <svg className='fixed cursor top-0 left-0 pointer-events-none' style={{ zIndex: 999999 }} width="64" height="64" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="m155.45 28.816c0.09375-25.605 31.004-38.418 49.188-20.391l330.04 327.22c6.4961 6.4414 9.0586 14.41 8.5742 22.055v33.309c0 14.906-13.328 30.613-32.188 28.449l-188.14-21.594-117.76 148.17c-17.039 21.441-51.566 9.3203-51.465-18.066 0.625-166.39 1.1172-332.77 1.7422-499.15zm34.492 41.48c0.035157-10.242 12.398-15.371 19.676-8.1602l265.16 262.9c7.7812 7.7148 1.4414 20.918-9.4492 19.668l-141.64-16.254c-9.8984-1.1367-19.688 2.9141-25.887 10.719l-88.57 111.44c-6.8125 8.5742-20.621 3.7305-20.586-7.2227z" fill-rule="nonzero" fill={backgroundColor}/>
            <path d="m155.45 28.816c0.09375-25.605 31.004-38.418 49.188-20.391l330.04 327.22c6.4961 6.4414 9.0586 14.41 8.5742 22.055v33.309c0 14.906-13.328 30.613-32.188 28.449l-188.14-21.594-117.76 148.17c-17.039 21.441-51.566 9.3203-51.465-18.066 0.625-166.39 1.1172-332.77 1.7422-499.15zm34.492 41.48c0.035157-10.242 12.398-15.371 19.676-8.1602l265.16 262.9c7.7812 7.7148 1.4414 20.918-9.4492 19.668l-141.64-16.254c-9.8984-1.1367-19.688 2.9141-25.887 10.719l-88.57 111.44c-6.8125 8.5742-20.621 3.7305-20.586-7.2227z" fill-rule="evenodd" fill={color}/>
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
