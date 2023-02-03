import { getStrapiMedia } from "../api/media";
import NextImage from "next/image";

const imageStyle = {
  maxWidth: "1000px"
}

const Image = ({ image }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <NextImage
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
      className="my-6"
      style={imageStyle}
    />
  );
};

export default Image;