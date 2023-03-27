import ReactMarkdown from 'react-markdown'
import { Roboto_Mono } from '@next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

import {
    faSquareCheck,
  } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default ({block, color, backgroundColor}) => {    
    return <div className="border-8 my-4" style={{borderColor: color}}>
        <div className="flex pa-2 pb-3" style={{backgroundColor: color}}>

            <div className="font-mono uppercase" style={{ color: backgroundColor }}>OBJECTIVE</div>
        </div>
        {
            block.items.map((item) => (<div className='flex items-center mx-2'>
                <FontAwesomeIcon
                className="mr-2"
                icon={faSquareCheck}
                style={{ fontSize: 18, color }}
                />
                <p className="m-2 font-mono">{item.textline}</p>
            </div>))
        }
    </div>
}