import {
    faQuoteLeft,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({author, content, color, backgroundColor}) => {
    return (
    <div className="border-8" style={{borderColor: color}}>
        <div className="flex pa-2 pb-3" style={{backgroundColor: color}}>
            <FontAwesomeIcon
            className="mr-2"
            icon={faQuoteLeft}
            style={{ fontSize: 24, color: backgroundColor }}
            />
            <div className="font-mono uppercase" style={{ color: backgroundColor }}>{author}</div>
        </div>
        <p className="m-2 font-mono">{content}</p>
    </div>
    )
}