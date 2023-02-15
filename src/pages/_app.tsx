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
import { useEffect, useState } from 'react'
import { fetchAPI, getStrapiURL } from '@/api/api'
import App from 'next/app'
import { getStrapiMedia } from '@/api/media'
import { log } from 'console'

config.autoAddCss = false;

function mod(value, module) {
  return ((value % module) + module) % module
}

function MyApp({ Component, pageProps, projects }) {
  const [backgroundColor, setBackgroundColor] = useState("")
  const [color, setColor] = useState("")
  const [scrollbarStyle, setScrollbarStyle] = useState({ "--background-color": "#FFF", "--color": "#000" } as React.CSSProperties)

  const [onTransition, setTransition] = useState(true)
  const [iconList, setIconList] = useState([])

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
    console.log("INDEX", index)
    if (index !== -1) {
      const values = Object.values(projects)
      const length = values.length
      console.log(mod(index-2, length))

      const list = []

      for(let i = -4; i <= 4; i += 1) {
        list.push(values[mod(index+i, length)])
      }
      
      setIconList(list)

      console.log("iconList", iconList)
    }
  }, [])

  useEffect(() => {
    console.log("USEEFFECT");

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

  function goToProject(project, index = -1) {

    if (project === "next") {
      return
    } else if (project === "previous") {
      return
    }

    const steps = index - 4

    const iconHeight = document.querySelector(".icon").offsetHeight + 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)

    gsap.to(".icon", {
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
    }
  }
  return (
    <>
      <div className='fixed inset-0' style={{  filter: "blur(1px)", backgroundSize: "40px 40px", backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`}}></div>
      <div className={`crt h-[100vh] p-10 ${league.variable} flex justify-center`} style={ scrollbarStyle }>
        <div id="terminal" className='relative h-full w-full border-8' style={{ borderColor: color, maxWidth: 1273, backgroundColor }}>
          <div id="navbar" className="absolute top-0 left-0 right-0 h-20 border-b-8 flex items-center justify-start" style={{ borderColor: color }}>
          
          <div className='relative h-full aspect-square'>
            <div className='logo'></div>
            <div className='absolute inset-0' style={{ backgroundColor: color, mixBlendMode: "multiply" }}></div>
          </div>
          <h2 style={{color: color}} className='font-black text-4xl flex overflow-hidden'>ANDRIU GARCIA {project ? <div className='navbarProjectTitle'>x {project.title.toUpperCase()}</div> : ''}</h2>
          <div className='grow'></div>
          <div className='mr-10 flex gap-3'>
            <a href="/resume" className="font-mono" style={{ color: color }}>RESUME</a>
            <a href="/contact" className="font-mono" style={{ color: color }}>CONTACT</a>
          </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 mt-[80px] w-20 border-r-8 flex flex-col gap-y-10 justify-center items-center" style={{ borderColor: color }}>
            <div className='absolute w-full h-16 top-[50%]' style={{ backgroundColor: color, transform: "translateY(-50%)" }}></div>
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
                    return <div className='icon w-10 h-10'><img src={getStrapiURL(item?.attributes?.logo?.logo.data.attributes.url)} onClick={() => goToProject(item, index)} className='w-10 h-10 z-10'></img></div>
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
          <div className="ml-20 mt-20" style={{height: 'calc(100% - 5rem)'}}>
            <Component {...pageProps} onTransition={onTransition} setTransition={setTransition}/>
          </div>
        </div>
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

  console.log("GETTING INITIAL PROPS")

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
  } })
])

  console.log("PROJECTs", projectsRes.data)

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data }, projects: projectsRes.data };
};

export default MyApp;
