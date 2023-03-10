import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"

export default ({categories, highlightsUpdate}) => {

    const [step, setStep] = useState(0)

    const [currentProject, setCurrentProject] = useState({
        name: "Olimaps",
        marquee: "Latest Project"
    })
    
    const [currentCategory, setCurrentCategory] = useState(null)

    const [terminal, setTerminal] = useState(
        "> Select an area from the left side to find a project that matches the need for your project"
    )

    useEffect(() => {
        const marquees = document.querySelectorAll(".assistant__marquee")
        marquees.forEach(marquee => {
            marquee.style.width = marquee?.parentElement.offsetHeight + "px"
            marquee.style.left = -((marquee.parentElement.offsetHeight / 2) - 14) + "px"
        })
    })

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //     setText1(first_text.slice(0, text1.length + 1));
    //     }, 100);
    //     return () => clearTimeout(timeout);
    // }, [text1]);

    let i = 0
    function updateTerminal(text) {
        console.log(terminal + text.charAt(i));
        
        if (i < text.length) {
            setTerminal(terminal + text.substring(0, i))
            i++;
            setTimeout(() => updateTerminal(text), 50)
        } else {
            i = 0
        }
    }

    function setCategory(index) {
        console.log("CLICK CATEGORY", categories[index]);
        
        updateTerminal("> Looking highlights for this area")
        // updateTerminal("> Looking some interesting tasks done in this area")


        setCurrentCategory(categories[index])

        setStep(1)

        highlightsUpdate(categories[index].highlights)
    }

    return (
        <div className="p-4 w-full h-full">
            <div className="border-8 w-full h-full" style={{borderColor: "black"}}>
                <div className="h-6 w-full flex justify-between items-center" style={{backgroundColor: "black", color: "white"}}>
                    <div className="font-mono">PROJECT FIND ASSISTANT</div>
                    <div className="font-mono">v2.0</div>
                </div>
                <div className="h-12 border-b-8" style={{borderColor: "black"}}>
                    <span className="uppercase">Find an example of a skill that fits your needs</span>
                </div>
                <div className="flex w-full" style={{ height: "calc(100% - 72px)" }}>
                    <div className="relative w-10 h-full border-r-8" style={{borderColor: "black"}}>
                        <div className="assistant__marquee absolute" style={{ top: "calc(50% - 12px)" }}>
                            <Marquee className="text-2xl" gradient={false} speed={2} style={{ transform: "rotate(-90deg)", color: "black" }}>CHOOSE AN AREA - CHOOOSE AN AREA - CHOOSE AN AREA -</Marquee>
                        </div>
                    </div>
                    <div className="w-1/4 border-r-8" style={{borderColor: "black"}}>
                        {
                            [...Array(10)].map((el, i) => (<div className="h-10 flex items-center uppercase font-mono border-b-8" onClick={() => setCategory(i)} style={{borderColor: "black"}}>
                                {categories[i]?.name || ""}
                            </div>))
                        }
                    </div>
                    <div className="relative w-10 h-full border-r-8" style={{borderColor: "black"}}>
                        <div className="assistant__marquee absolute" style={{ top: "calc(50% - 12px)" }}>
                            <Marquee className="text-2xl" gradient={false} speed={2} style={{ transform: "rotate(-90deg)", color: "black" }}>{step === 0 ? "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑" : "CHOOSE AN AREA - CHOOOSE AN AREA - CHOOSE AN AREA -"}</Marquee>
                        </div>
                    </div>
                    <div className="w-1/4 border-r-8" style={{borderColor: "black"}}>
                        {
                            [...Array(10)].map((el, i) => (<div className="h-10 uppercase border-b-8" style={{borderColor: "black"}}>
                                {
                                    currentCategory ? currentCategory.recommendations[i]?.name : ''
                                }
                            </div>))
                        }
                    </div>
                    <div className="w-1/2">
                        <div className="h-3/5 w-full p-4">
                            <div className="text-xs font-mono mb-2">{terminal} </div>

                            <div className="blinking-cursor"></div>
                        </div>
                        <div className="h-2/5 w-full">
                            <div className="h-12 py-2 w-full" style={{ backgroundColor: "black" }}>
                                <Marquee className="uppercase text-2xl" gradient={false} speed={40} style={{ color: "white" }}>{currentProject.marquee} · {currentProject.marquee} · {currentProject.marquee} · </Marquee>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <div className='overflow-y-hidden text-3xl font-black uppercase flex'>{currentProject.name}</div>
                                    <div className="font-mono text-xs">/////////////////</div>
                                    <div className="font-mono text-xs">/////////////////</div>
                                    <div className="font-mono text-xs">/////////////////</div>
                                </div>
                                <div className="relative h-24 w-24" style={{ backgroundColor: "black" }}>
                                    <div className="absolute top-[50%] left-[50%]" style={{ transform: "translate(-50%, -50%)" }}>
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            style={{ fontSize: 48, color: "white", transform: "rotate(45deg)" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}