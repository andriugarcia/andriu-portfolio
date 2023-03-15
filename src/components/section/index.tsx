import ReactMarkdown from 'react-markdown'
import { Roboto_Mono } from '@next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

import Image from "@/components/image"
import External from "@/components/section/external"
import { log } from 'console'
import Recommendation from './recommendation'

const videoStyle = {}

function renderBlock(type, block, color, backgroundColor) {
    switch (type.toLowerCase()) {
        case "rich-text":
            return <ReactMarkdown className={`${roboto_mono.variable} font-mono w-full`} children={block.body} style={{color}}></ReactMarkdown>
        case "external":
            return <External color={color} backgroundColor={backgroundColor} name={block.name} url={block.url} ></External>
        case "recommendation":
            return <Recommendation author={block.author} content={block.content} color={color} backgroundColor={backgroundColor}></Recommendation>
        case "media":
            return <Image image={block.file}></Image>
        case "video":
            return <video controls auto-play style={videoStyle} src={node.url}></video>
        default:
            return <div></div>
    }
}

export default ({section, color, backgroundColor}) => {

    return Object.entries(section).map((block) => renderBlock(block[0], block[1], color, backgroundColor))
}