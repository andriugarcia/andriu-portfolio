import ReactMarkdown from 'react-markdown'
import { Roboto_Mono } from '@next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

import Image from "@/components/image"
import External from "@/components/section/external"
import { log } from 'console'
import Recommendation from './recommendation'
import Carousel from './carousel'
import Objective from './objective'
import Desplegable from './desplegable'

const videoStyle = {}

function renderBlock(index, type, block, color, backgroundColor) {
    
    console.log("RENDER BLOCK", index, type, block);
    

    switch (type.toLowerCase()) {
        case "shared.rich-text":
            return <li key={index} className="section-item"><ReactMarkdown className={`${roboto_mono.variable} font-mono w-full`} children={block.body} style={{color}}></ReactMarkdown></li>
        case "shared.external":
            return <li key={index} className="section-item"><External color={color} backgroundColor={backgroundColor} name={block.name} url={block.url} ></External></li>
        case "shared.recommendation":
            return <li key={index} className="section-item"><Recommendation author={block.author} content={block.content} color={color} backgroundColor={backgroundColor}></Recommendation></li>
        case "shared.media":
            return <li key={index} className="section-item"><Image image={block.file}></Image></li>
        case "shared.image":
            return <li key={index} className="section-item"><img className='my-6' src={block.url} alt="" /></li>
        case "shared.video":
            return <li key={index} className="section-item"><video autoPlay muted loop style={videoStyle} src={block.url}></video></li>
        case "shared.objective":
            return <li key={index} className="section-item"><Objective block={block} color={color} backgroundColor={backgroundColor}></Objective></li>
        case "shared.carousel":
            return <li key={index} className="section-item"><Carousel images={block.images}></Carousel></li>
        case "shared.desplegable":
            return <li key={index} className="section-item"><Desplegable items={block.item} color={color} backgroundColor={backgroundColor}></Desplegable></li>
        default:
            return <li key={index} className="section-item"><div></div></li>
    }
}

export default ({section, color, backgroundColor}) => {
    return <ul>{section.map((block, index) => renderBlock(index, block.__component, block, color, backgroundColor))}</ul>
}