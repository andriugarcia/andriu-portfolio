import '@/styles/globals.css'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { League_Spartan } from '@next/font/google'
const league = League_Spartan({ subsets: ['latin'] })

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

config.autoAddCss = false;

// const projects = {
//   'olimaps': {
//       name: 'olimaps',
//       color: '#FF0054',
//       secondaryColor: '#400015'
//     },
//     'pantala': {
//       name: 'pantala',
//       color: '#1c1c1c',
//       secondaryColor: '#FEFEFE'
//     },
//     'kanuki': {
//       name: 'kanuki',
//       color: '#0054ff',
//       secondaryColor: '#400015'
//   },
// }

function MyApp({ Component, pageProps, projects }) {
  const [backgroundColor, setBackgroundColor] = useState("")
  const [color, setColor] = useState("")

  const router = useRouter() 

  const project = projects[router.query.project]
  

  console.log(backgroundColor, color);

  useEffect(() => {
    console.log("USEEFFECT");
    
    setBackgroundColor(project?.color || "#000000")
    setColor(project?.secondaryColor || "#FFFFFF")
    
    console.log("Changing color", backgroundColor);

    gsap.fromTo('.title-char', {
      yPercent: 110
    }, {
      yPercent: 0,
      duration: 1,
      stagger: 0.05,
      expo: 'Expo.easeInOut',
    })

    gsap.fromTo('.highlight', {
      y: '100vh'
    }, {
      y: 0,
      duration: 1,
      expo: 'Expo.easeInOut',
      stagger: 0.10
    })

    const blinkingElements = gsap.utils.toArray("section img, section video")

    blinkingElements.forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom top',
          trigger: el,
          toggleClass: 'blink'
        }
      });
    }, [router.asPath]);
    })
  

  function goToProject(project) {
  
    if(typeof window !== 'undefined') {
      setBackgroundColor(project.attributes.color)
      setColor(project.attributes.secondaryColor)

      console.log("Changing color ON CLICK", name,);

      gsap.fromTo('.highlight', {
        y: 0
      }, {
        y: '-100vh',
        duration: 1,
        expo: 'Expo.easeInOut',
        stagger: 0.10
      })

      gsap.fromTo('.title-char', {
        yPercent: 0
      }, {
        yPercent: 110,
        duration: 1,
        expo: 'Expo.easeInOut',
        stagger: 0.05,
        onComplete: () => router.push('/' + project.attributes.title.replaceAll(" ", "").toLowerCase())
      })
    }
  }
  return (
    <>
      <div className={`crt h-[100vh] p-10 ${league.className} flex justify-center`} style={{ backgroundColor }}>
        <div className='relative h-full w-full max-w-screen-2xl border-8' style={{ borderColor: color }}>
          <div className="absolute top-0 left-0 right-0 h-20 border-b-8 flex items-center justify-between" style={{ borderColor: color }}>
          <h2 style={{color: color, marginLeft: '132px'}} className='font-black text-4xl'>ANDRIU GARCIA</h2>
          <div className='mr-10 flex gap-3'>
            <a href="/resume" style={{ color: color }}>RESUME</a>
            <a href="/projects" style={{ color: color }}>PROJECTS</a>
            <a href="/contact" style={{ color: color }}>CONTACT</a>
          </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-20 border-r-8 flex flex-col justify-center items-center" style={{ borderColor: color }}>
            <FontAwesomeIcon
              icon={faChevronUp}
              className="absolute top-[100px]"
              style={{ fontSize: 36, color: color }}
            />
            {
              Object.values(projects).map(project => {
                console.log(project);
                
                return <img src={getStrapiURL(project.attributes.logo?.logo.url)} onClick={() => goToProject(project)} className='w-10 h-10 bg-white mb-2'></img>
              })
            }
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute bottom-[20px]"
              style={{ fontSize: 36, color: color }}
            />
          </div>
          <div className="ml-20 mt-20" style={{height: 'calc(100% - 5rem)'}}>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
    
  )
}

export async function getStaticProps() {
  // Run API calls in parallel

  return {
    props: {
      projects: projectsRes.data,
    },
  };
}

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
  } })
])

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data }, projects: projectsRes.data };
};

export default MyApp;
