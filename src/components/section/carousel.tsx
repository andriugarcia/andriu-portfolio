import Marquee from "react-fast-marquee";
import Image from "./image"

export default ({images, color, backgroundColor}) => {
    return (<>
        <Marquee className='marquee' gradient={false} speed={10} style={{color: backgroundColor}}>
        {
            images.map((image) => <Image src={image.url} className="object-contain h-full mr-6" style={{maxHeight: 400}} caption={image.caption}></Image>)
        }

        </Marquee>
    </>)
}