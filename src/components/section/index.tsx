import ReactMarkdown from 'react-markdown'
import { Roboto_Mono } from '@next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

import Image from "@/components/image"
import External from "@/components/section/external"
import { log } from 'console'
import Recommendation from './recommendation'
import Objective from './objective'

const videoStyle = {}

function renderBlock(index, type, block, color, backgroundColor) {
    
    console.log("RENDER BLOCK", index, type, block);
    

    switch (type.toLowerCase()) {
        case "shared.rich-text":
            return <li key={index}><ReactMarkdown className={`${roboto_mono.variable} font-mono w-full`} children={block.body} style={{color}}></ReactMarkdown></li>
        case "shared.external":
            return <li key={index}><External color={color} backgroundColor={backgroundColor} name={block.name} url={block.url} ></External></li>
        case "shared.recommendation":
            return <li key={index}><Recommendation author={block.author} content={block.content} color={color} backgroundColor={backgroundColor}></Recommendation></li>
        case "shared.media":
            return <li key={index}><Image image={block.file}></Image></li>
        case "shared.image":
            return <li key={index}><img className='my-6' src={block.url} alt="" /></li>
        case "shared.video":
            return <li key={index}><video autoPlay muted loop style={videoStyle} src={block.url}></video></li>
        case "shared.objective":
            return <li key={index}><Objective block={block} color={color} backgroundColor={backgroundColor}></Objective></li>
        default:
            return <li key={index}><div></div></li>
    }
}

export default ({section, color, backgroundColor}) => {
    return <ul>{section.map((block, index) => renderBlock(index, block.__component, block, color, backgroundColor))}</ul>
}