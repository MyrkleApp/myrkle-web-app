import { Flex, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from "@/assets/landing-page/b1.png";
import b2 from "@/assets/landing-page/b2.png";
import c1 from "@/assets/landing-page/c1.png";
import c2 from "@/assets/landing-page/c2.png";
import d1 from "@/assets/landing-page/d1.png";
import d2 from "@/assets/landing-page/d2.png";
import e1 from "@/assets/landing-page/e1.png";
import e2 from "@/assets/landing-page/e2.png";

const images = [
  [b1, b2],
  [c1, c2],
  [d1, d2],
  [e1, e2],
];

export interface MyCarouselProps {
  handleChange: (currentIndex: number) => void;
}

function MyCarousel({ handleChange }: MyCarouselProps) {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} selectedItem={0} onChange={handleChange}>
      {images.map((image, i) => (
        <Flex key={i} justify="space-between" align="center" gap="50px" overflow="hidden">
          <Image src={image[0]} alt="" maxW="35%" />
          <Image src={image[1]} alt="" maxW="65%" />
        </Flex>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
