import Image from "next/image";

const ImageLayout = ({imageSource}) => {
  return (
      <Image
          src={imageSource} // Route of the image file sourced from public folder
          height={144} // Desired size with correct aspect ratio
          width={144} // Desired size with correct aspect ratio
          alt="Your Name"
      />
  );
}

export default ImageLayout;