import ReactMarkdown from 'react-markdown'
import { Roboto_Mono } from '@next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

import Image from "@/components/image"

const videoStyle = {}

function renderBlock(type, block, color) {
    console.log(type, block)
    switch (type) {
        case "rich-text":
            return <ReactMarkdown className={roboto_mono.className} children={block.body} style={{color}}></ReactMarkdown>
        case "external":
            return <></>
        case "media":
            return <Image image={block.file}></Image>
        case "video":
            return <video controls auto-play style={videoStyle} src={node.url}></video>
        default:
            return <div></div>
    }
}

export default ({section, color, backgroundColor}) => {

    return Object.entries(section).map((block) => renderBlock(block[0], block[1], color))
}