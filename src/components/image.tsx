import { getStrapiMedia } from "../api/media";
import NextImage from "next/image";

const imageStyle = {
  // marginLeft: "-2.5rem",
  // marginRight: "-2.5rem",
  // width: "auto"
}

const Image = ({ image }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <NextImage
      layout="responsive"
      height={height}
      width={width}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
      className="my-6"
      style={imageStyle}
    />
  );
};

export default Image;