import Head from 'next/head'
import { useRouter } from 'next/router';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
// import Image from 'next/image'
import Marquee from "react-fast-marquee";

import { fetchAPI } from '@/api/api';
import Section from '@/components/section';

import { gsap } from "gsap";
import { log } from 'console';

import Spline from "@/components/spline"
import FloatingCard from "@/components/floatingCard"

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Params = {
  params: {
    project: String
  }
}

export async function getStaticPaths() {
    const [projectsRes] = await Promise.all([
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
    
    return {
      paths: projectsRes.data.map((project: unknown) => ({
        params: {
          project: project.attributes.title.replaceAll(" ", "").toLowerCase(),
          content: project.attributes
        }
      })),
      fallback: false, // can also be true or 'blocking'
    }
  }

  export async function getStaticProps({params}: Params): Promise<{
    // Passed to the page component as props
    props: { project: any, color: String, backgroundColor: String }
  }> {

    const projectsRes =
      await fetchAPI("/projects", { 
        filters: {
          title: params.project[0].toUpperCase() + params.project.substring(1)
        },
        populate: {
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
        },
        highlights: {
          populate: "*"
        }
      } })
      
      let nextProject = null
      try {
        const nextProjectData = await fetchAPI(`/projects/${projectsRes.data[0].id + 1}`)
        nextProject = nextProjectData.data.attributes
      } catch(err) {
        console.error("Next Project not available")
      }

    return {
  
      // Passed to the page component as props
      props: { 
        project: projectsRes.data[0].attributes, 
        nextProject,
        color: projectsRes.data[0].attributes.secondaryColor, 
        backgroundColor: projectsRes.data[0].attributes.color 
      }
    }
  }

export default function Home({project, nextProject, color, backgroundColor, goToProject, onTransition, setTransition, ...params}) {

  const router = useRouter() 
  const nextProjectRef = useRef(null)
  const scrollarea = useRef(null)
  const [blinking, setBlinking] = useState(false)
  const [scrollStatus, setScrollStatus] = useState(0)
  const [splineEnabled, setSplineEnabled] = useState(true)
  const [currentSection, setCurrentSection] = useState({
    id: 0,
    name: "ABOUT"
  })
  const [tvEffect, setTvEffect] = useState({
    background: `repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px`,
    backgroundBlendMode: "difference",
    animation: "b .2s infinite alternate"
  })
  const [content, setContent] = useState({})

  let stack = ""

  project.technologies.data.forEach(tech => {
    stack += tech.attributes.name.toUpperCase() + " // "
  })

  setInterval(() => {
    setBlinking(!blinking)
  }, 1000)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".container3d",
      scroller: "#scrollarea",
      start: "top top",
      end: "50% top",
      onEnterBack: (el) => setSplineEnabled(true),
      onLeave: (el) => setSplineEnabled(false),
    });

  }, [])

  useEffect(() => {
    scrollarea.current.scrollTo(0, 0)
    setTvEffect({
      background: `repeating-radial-gradient(${backgroundColor} 0 0.0001%,${color} 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(${backgroundColor} 0 0.0001%,${color} 0 0.0002%) 60% 60%/2500px 2500px`,
      backgroundBlendMode: "difference",
      animation: "b .2s infinite alternate"
    })

    document.getElementById("projectBar").style.height = (document.getElementById("scrollarea").offsetHeight) + "px"
    
    document.getElementById("projectBar__rotated-content").style.width = document.getElementById("projectBar")?.offsetHeight + "px"
    document.getElementById("projectBar__rotated-content").style.height = document.getElementById("projectBar")?.offsetWidth + "px"

    const position = (document.getElementById("projectBar")?.offsetWidth - document.getElementById("projectBar")?.offsetHeight) / 2

    document.getElementById("projectBar__rotated-content").style.top = (-position) + "px"
    document.getElementById("projectBar__rotated-content").style.left = position + "px"
    
    
    gsap.set(".navbarProjectTitle", {
      yPercent: 110,
    })
    
    gsap.fromTo(".circleText", {
      rotate: 0
    }, {
      rotate: 360,
      scrollTrigger: {
        trigger: "#scrollarea > .flex",
        scroller: "#scrollarea",
        scrub: 0.5,
      }
    })
    gsap.fromTo(".scrollStatus", {
      left: "100%"
    }, {
      left: "0%",
      scrollTrigger: {
        trigger: "#scrollarea > .flex",
        scroller: "#scrollarea",
        scrub: 0.5,
      }
    })


    setTimeout(() => {
      setTransition(false)
    }, 1000)

    setContent({})

    let contentAux = {}

    let actualItem = null;
    project.content.forEach((item: any) => {
      if (item.__component === "section.section-name") {
        
        contentAux[item.name] = {}
        actualItem = contentAux[item.name];
      } else {
        actualItem[
          item.__component.substr(item.__component.indexOf(".") + 1)
        ] = item;
      }
    });

    setContent(contentAux)

    const timeline = gsap.timeline()
    const tvOffElement = document.querySelector(".tv-off")
    const tvOffRect = tvOffElement?.getBoundingClientRect()
    const scrollArea = document.querySelector("#scrollarea")

    timeline.to(".tv-off__top, .tv-off__bottom", {
      height: 0,
      duration: 0.5,
      ease: "Expo.easeIn"
    })
    timeline.set(".tv-off", {
      zIndex: 0,
      display: "none"
    })

  }, [router.asPath])

  useEffect(() => {
    setTimeout(() => {
      console.log(Array.from(document.getElementsByClassName("contentBlock")));
      Array.from(document.getElementsByClassName("contentBlock")).forEach((block, index) => {
        console.log(block);
        
        ScrollTrigger.create({
          trigger: block,
          scroller: "#scrollarea",
          onEnter: (el) => setCurrentSection({id: index, name: el.trigger.children[0].children[0].innerText}),
          onEnterBack: (el) => setCurrentSection({id: index, name: el.trigger.children[0].children[0].innerText}),
        });
      })
    }, 1000)
  }, [content])

  let fullWidth = false
  let alreadyScrolled = false
  const handleScroll = (event) => {
    const height = event.currentTarget.clientHeight;
    const barHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;

    setScrollStatus(((height + scrollTop) / barHeight) * 100)
    

    if(scrollTop > 0) {
      if (!alreadyScrolled) {
        alreadyScrolled = true

        gsap.to(".navbarProjectTitle", {
          yPercent: 0,
          duration: 1,
        })
      
        gsap.to(".floatingCard", {
          right: -300,
          top: 0.6 * window.innerHeight,
          zIndex: 20,
          rotation: 0,
        })
      }
    } else {
      alreadyScrolled = false
      const distance = window.innerWidth - document.querySelector("main")?.getBoundingClientRect().right
      gsap.to(".floatingCard", {
        right: distance -100,
        bottom: -60,
        rotation: -18,
      })
      gsap.to(".navbarProjectTitle", {
        yPercent: 110,
        duration: 1,
      })
    }

    if (nextProject) {
      if (height + scrollTop > barHeight - (nextProjectRef.current.clientHeight/2)) {
        // Full width
        
        if (!fullWidth) {
          fullWidth = true
          gsap.to(".nextProjectOverlay", {
            right: "0%",
            duration: 3,
            ease: "linear",
            overwrite: true,
            onComplete: () => goToProject()
          })
        }
  
      } else {
        if (fullWidth) {
          fullWidth = false
          gsap.to(".nextProjectOverlay", {
            right: "100%",
            duration: 3,
            ease: "linear",
            overwrite: true
          })
        }
      }

    }

    
  };

  const textRotation = {
    transformOrigin: "bottom right",
    transform: "rotate(-90deg)",
    position: "absolute",
    top: 0, right: 0,
    // position: "sticky",
    // top: 184,
    fontSize: "2em"
  }

  const stripeBackground = {
    backgroundImage: `linear-gradient(130deg, ${color} 25%, ${backgroundColor} 25%, ${backgroundColor} 50%, ${color} 50%, ${color} 75%, ${backgroundColor} 75%, ${backgroundColor} 100%)`,
    backgroundSize: "5.22px 6.22px"
  }

  function splineLoaded() {
    const distance = window.innerWidth - document.querySelector("main")?.getBoundingClientRect().right
    gsap.to(".floatingCard", {
      right: distance -100,
      top: 0.6 * window.innerHeight,
      zIndex: 20,
      rotation: -18,
    })

    ScrollTrigger.refresh()
  }

  return (
    <> 
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={scrollarea} id="scrollarea" className='overflow-y-scroll h-full' style={{ color: color}} onScroll={handleScroll}>
        <div className='grid grid-cols-8 grid-rows-6 h-full'>
          <div className='container3d relative row-start-1 row-end-5 col-start-1 col-end-7 border-r-8' style={{ borderColor: color }}>
            {
              (onTransition || !splineEnabled) ? <div className='w-full h-full' style={tvEffect}></div> : <></>
            }
            <Spline scene={project.spline} onLoad={splineLoaded} hidden={(onTransition || !splineEnabled)}/>
          </div>
          <div className='row-start-1 row-end-5 col-start-7 col-end-9 overflow-hidden'>
            {
              project.highlights.map(({highlight}) => {
                return (
                  <div className='p-6'>
                    <div className='highlight text-xl'>{highlight.toUpperCase()}</div>
                  </div>
                )
              })
            }
          </div>
          <div className='row-start-5 row-end-7 col-start-1 col-end-9 border-y-8' style={{ borderColor: color }}>
            <div className='h-1/3 border-b-8' style={{ borderColor: color }}>
            <Marquee className='marquee' gradient={false} speed={40} pauseOnHover={true} style={{color: backgroundColor, backgroundColor: color, fontSize: '56px'}}>{onTransition ? "////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////" : stack}</Marquee>
            </div>
            <div className='h-2/3 pl-10 flex items-center' style={{ borderColor: color }} >
              <h1 className='project-title overflow-y-hidden text-9xl font-black uppercase flex'>
                {
                project.title.split("").map((char: String) => (<div className='title-char'>{char}</div>))
                }
              </h1>
            </div>
          </div>
        </div>
        <div className="flex content">
          {
          onTransition ? '' : 
          <div className='w-[70%]'>
            {
              Object.entries(content).map((section) => {
                return (
                  <div className="contentBlock flex">
                    <div className="relative border-8 -ml-4 -mt-2 w-20 mh-40" style={{borderColor: color}}>
                      <div className='sticky h-80 top-0 pr-2'>
                        <h2 className="text-xl font-black uppercase" style={{color, ...textRotation}}>{section[0]}</h2>
                      </div>
                    </div>
                    <section className='pb-10 px-10' style={{ width: "calc(100% - 5rem)" }}>
                      <Section section={section[1]} color={color} backgroundColor={backgroundColor}></Section>
                    </section>
                  </div>
                )
              })
            }
          </div>
          }
          <div className='border-l-8 w-[30%]' style={{marginLeft: "auto", borderColor: color}}>
            <div id="projectBar" className='sticky top-0'>
              <div id="projectBar__rotated-content" className='absolute flex' style={{ transform: "rotate(-90deg)" }}>
                <div className='absolute top-0 right-2 h-6 w-1' style={{ backgroundColor: color }}></div>
                <div className='absolute top-0 right-2 h-6 w-1 mr-2' style={{ backgroundColor: color }}></div>
                <div className='absolute top-0 right-2 h-6 w-1 mr-4' style={{ backgroundColor: color }}></div>
                <div className="w-1/3 relative flex flex-col justify-between items-center p-6">
                  <div className='relative w-[200px] aspect-square rounded-full' style={{backgroundColor: color}}>
                    <div className='absolute top-[50%] left-[50%] w-20 h-20 rounded-full' style={{backgroundColor: backgroundColor, transform: "translate(-50%, -50%)"}}></div>
                    <div className='absolute top-[50%] left-[50%] w-1 h-1 rounded-full' style={{backgroundColor: color, transform: "translate(-50%, -50%)"}}></div>
                    <div className='circleText'>
                      <p className='uppercase text-mono'>{
                        `${currentSection.name} · ${currentSection.name} · ${currentSection.name} · ${currentSection.name} · `.split("").map((char, i) => <span style={{ color: backgroundColor, transform: "rotate(" + ((i * 360)/((currentSection.name.length+3)*4)) + "deg" }}>{char}</span>)  
                      }</p>
                    </div>
                    <div className='absolute bottom-[-12px] right-0 w-6 h-6 rounded-full' style={{backgroundColor: color}}></div>
                  </div>
                  <div className='font-black text-5xl' style={{color}}>PROJECT</div>
                  <div className='absolute top-6 right-0'>
                    <div className='w-6 h-6' style={{backgroundColor: color}}></div>
                    <div className='w-6 h-6 mt-4' style={{backgroundColor: color}}></div>
                  </div>
                </div>
                <div className="w-2/3 relative p-6 flex flex-col justify-between">
                  <div className='relative flex flex-col justify-start items-end flex-wrap w-full h-[50%]'>
                    <div className='absolute text-xl font-bold top-0 left-0'>[</div>
                    <div className='absolute text-xl font-bold bottom-0 right-0'>]</div>
                  {
                    Object.entries(content).map((section, index) => {
                      return (
                        <div className='w-[30%]'>
                          <div className='font-bold' style={{ backgroundColor: currentSection.id === index ? color : backgroundColor, color: currentSection.id === index ? backgroundColor : color }}>{index+1 + "   " + section[0].toUpperCase()}</div>
                        </div>
                      )
                    })
                  }
                  </div>
                  <div>
                    <div className="flex justify-end mb-2">
                      <div className='w-6 h-6 mr-2' style={{backgroundColor: color}}></div>
                      <div className='recordingSquare w-6 h-6 border-4' style={{borderColor: color, backgroundColor: blinking ? color : backgroundColor}}></div>
                    </div>
                    <Marquee className='marquee font-mono' gradient={false} speed={2} style={{color, fontSize: '12px'}}>
                      { [...Array(8)].map((e, i) => " " + currentSection.name + " · ") }
                    </Marquee>
                    <div className='border-4 relative' style={{ width: "100%", height: 32, borderColor: color }}>
                      <div className='scrollStatus absolute right-0 top-0 bottom-0' style={{backgroundColor: color}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {
          !nextProject ? '' :
          <div ref={nextProjectRef} className='relative -mt-2'>
            <div className='border-y-8' style={{ borderColor: color }}>
              <Marquee className='marquee' gradient={false} speed={40} style={{fontSize: '56px'}}>NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT --</Marquee>
            </div>
            <div className='pl-10 flex items-center' style={{ borderColor: color }} >
              <span className='overflow-y-hidden text-9xl font-black uppercase flex'>
                {
                  nextProject.title
                }
              </span>
            </div>
            {/* Inverted version */}
            <div className='nextProjectOverlay absolute z-10 left-0 top-0 bottom-0 right-[100%]'>
              <div className='border-y-8' style={{ backgroundColor: color, color: backgroundColor, borderColor: color }}>
                <Marquee className='marquee' gradient={false} speed={40} style={{fontSize: '56px'}}>NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT --</Marquee>
              </div>
              <div className='pl-10 flex items-center' style={{ backgroundColor: color, color: backgroundColor, borderColor: backgroundColor }} >
                <span className='overflow-y-hidden text-9xl font-black uppercase flex'>
                  {
                    nextProject.title
                  }
                </span>
              </div>
            </div>
          </div>
        }
        <FloatingCard project={project} color={color} backgroundColor={backgroundColor}></FloatingCard>
      </main>
    </>
  )
}
