import Head from 'next/head'
import { useRouter } from 'next/router';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
// import Image from 'next/image'
import Marquee from "react-fast-marquee";
import Spline from '@splinetool/react-spline';
import { fetchAPI } from '@/api/api';
import Section from '@/components/section';

import { gsap } from "gsap";

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
    
      console.log("PROJECT", projectsRes.data[0].attributes);
      
      const nextProject = await fetchAPI(`/projects/${projectsRes.data[0].id + 1}`)

      console.log("NEXTPROJECT", nextProject);
      

    return {
  
      // Passed to the page component as props
      props: { 
        project: projectsRes.data[0].attributes, 
        nextProject: nextProject.data.attributes,
        color: projectsRes.data[0].attributes.secondaryColor, 
        backgroundColor: projectsRes.data[0].attributes.color 
      }
    }
  }

export default function Home({project, nextProject, color, backgroundColor, onTransition, setTransition, ...params}) {

  const router = useRouter() 
  const nextProjectRef = useRef(null)
  const scrollarea = useRef(null)
  const [tvEnabled, setTvEnabled] = useState(true)
  const [tvEffect, setTvEffect] = useState({
    background: `repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px`,
    backgroundBlendMode: "difference",
    animation: "b .2s infinite alternate"
  })

  let stack = ""

  project.technologies.data.forEach(tech => {
    stack += tech.attributes.name.toUpperCase() + " // "
  })

  useEffect(() => {
    setTvEnabled(false)
    scrollarea.current.scrollTo(0, 0)
    setTvEffect({
      background: `repeating-radial-gradient(${backgroundColor} 0 0.0001%,${color} 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(${backgroundColor} 0 0.0001%,${color} 0 0.0002%) 60% 60%/2500px 2500px`,
      backgroundBlendMode: "difference",
      animation: "b .2s infinite alternate"
    })

    console.log("USEEFFECT PAGE");
    

    setTimeout(() => {
      setTvEnabled(false)

      setTransition(false)
    }, 1000)

  }, [router.asPath])

  let fullWidth = false
  const handleScroll = (event) => {
    const height = event.currentTarget.clientHeight;
    const barHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;

    gsap.to(".navbarProjectTitle", {
      yPercent: 110,
      duration: 1,
      scrollTrigger: {
        trigger: ".content",
        start: 'top bottom',
        end: 'bottom top',

      }
    })

    if (height + scrollTop > barHeight - (nextProjectRef.current.clientHeight/2)) {
      // Full width
      
      if (!fullWidth) {
        fullWidth = true
        gsap.to(".nextProjectOverlay", {
          right: "0%",
          duration: 5,
          ease: "linear",
          overwrite: true,
          onComplete: () => router.push('/' + nextProject.title.replaceAll(" ", "").toLowerCase())
        })
      }

    } else {
      if (fullWidth) {
        fullWidth = false
        gsap.to(".nextProjectOverlay", {
          right: "100%",
          duration: 5,
          ease: "linear",
          overwrite: true
        })
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

  const [content, setContent] = useState({})

  let actualItem = null;
  project.content.forEach((item: any) => {
    if (item.__component === "section.section-name") {
      content[item.name] = {}
      actualItem = content[item.name];
    } else {
      actualItem[
        item.__component.substr(item.__component.indexOf(".") + 1)
      ] = item;
    }
  });
  

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
          <div className='relative row-start-1 row-end-5 col-start-1 col-end-7 border-r-8' style={{ borderColor: color }}>
            {
              onTransition ? <div className='w-full h-full' style={tvEffect}></div> : <Spline scene="https://prod.spline.design/uXo7Zf685kPDev3f/scene.splinecode" />
            }
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
          <div>
            {
              Object.entries(content).map((section) => {
                return (
                  <div className="flex">
                    <div className="relative border-8 -ml-4 -mt-2 w-20 mh-40" style={{borderColor: color}}>
                      <div className='sticky h-80 top-0 pr-2'>
                        <h2 className="text-xl font-black uppercase" style={{color, ...textRotation}}>{section[0]}</h2>
                      </div>
                    </div>
                    <section className='pb-10 px-10'>
                      <Section section={section[1]} color={color} backgroundColor={backgroundColor}></Section>
                    </section>
                  </div>
                )
              })
            }
          </div>
          <div className='border-l-8 w-[20vw] sticky top-0' style={{marginLeft: "auto", borderColor: color}}>
            <div className='sticky top-0'>
            Sticky Element
            </div>
          </div>

        </div>
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
          <div className={`nextProjectOverlay absolute z-10 left-0 top-2 bottom-0`} style={{backdropFilter: 'invert(1)', transition: 'width 5s ease-in'}}></div>
        </div>

      </main>
    </>
  )
}
