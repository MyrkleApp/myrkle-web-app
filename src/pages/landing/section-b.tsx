import { MotionBox, MotionText } from "@/components/motion-elements";
import WhiteRing from "@/components/white-ring";
import { generateAnimateObject } from "@/helpers";
import MyCarousel from "@/components/carousel";
import { useState } from "react";

const ringLocations1 = [
  [0, 0],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, 0],
  [-15, -10],
  [15, -10],
  [0, 0],
  [0, -20],
  [15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
];

const ringLocations2 = [
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, 0],
  [-15, -10],
  [15, -10],
  [0, 0],
  [0, -20],
  [15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [15, -10],
];

const ringLocations3 = [
  [-15, -10],
  [15, -10],
  [0, 0],
  [0, -20],
  [15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, 0],
];

const ringLocations4 = [
  [15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [0, 0],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, -20],
  [-15, -10],
  [15, -10],
  [0, 0],
  [-15, -10],
  [15, -10],
  [0, 0],
  [0, -20],
];

const texts = [
  "An intuitive interface makes it easy for both beginners and experts to use.",
  "get detailed information about the state of your tokens and NFTs.",
  "create and manage checks and escrows",
  "creation and management of tokens and NFTs.",
];

function SectionB() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const handleCarouselChange = (index: number) => {
    setCurrentCarouselIndex(index);
  };

  return (
    <MotionBox
      w="100vw"
      h="100vh"
      pos="relative"
      overflow="hidden"
      initial={{ opacity: 0, y: 200 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } }}
    >
      <MyCarousel handleChange={handleCarouselChange} />

      <WhiteRing
        initial={{ top: "100vh", left: "10%" }}
        whileInView={{
          ...generateAnimateObject(
            ringLocations1[currentCarouselIndex][0],
            ringLocations1[currentCarouselIndex][1],
          ),
        }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "25%" }}
        whileInView={{
          ...generateAnimateObject(
            ringLocations2[currentCarouselIndex][0],
            ringLocations2[currentCarouselIndex][1],
          ),
        }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "75%" }}
        whileInView={{
          ...generateAnimateObject(
            ringLocations3[currentCarouselIndex][0],
            ringLocations3[currentCarouselIndex][1],
          ),
        }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "90%" }}
        whileInView={{
          ...generateAnimateObject(
            ringLocations4[currentCarouselIndex][0],
            ringLocations4[currentCarouselIndex][1],
          ),
        }}
      />

      <MotionText
        textAlign="center"
        fontSize="sm"
        w="140px"
        pos="absolute"
        top="calc(50% - 30px)"
        left="50%"
        transform="translateX(-50%)"
      >
        {texts[currentCarouselIndex]}
      </MotionText>
    </MotionBox>
  );
}

export default SectionB;
