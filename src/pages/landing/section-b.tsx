import { MotionBox } from "@/components/motion-elements";
import b1 from "@/assets/landing-page/b1.png";
import b2 from "@/assets/landing-page/b2.png";
import { Image, Text } from "@chakra-ui/react";
import WhiteRing from "@/components/white-ring";
import { generateAnimateObject } from "@/helpers";

function SectionB() {
  return (
    <MotionBox
      w="100vw"
      h="100vh"
      pos="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <Image src={b1} alt="" pos="absolute" bottom="10%" left={0} h="50%" />
      <Image src={b2} alt="" pos="absolute" right={0} bottom={0} h="80%" />

      <WhiteRing
        initial={{ top: "100vh", left: "10%" }}
        animate={{ ...generateAnimateObject(0, 0) }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "25%" }}
        animate={{ ...generateAnimateObject(0, -20) }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "75%" }}
        animate={{ ...generateAnimateObject(-15, -10) }}
      />
      <WhiteRing
        initial={{ top: "100vh", left: "90%" }}
        animate={{ ...generateAnimateObject(15, -10) }}
      />

      <Text
        textAlign="center"
        fontSize="sm"
        w="140px"
        pos="absolute"
        top="calc(50% - 30px)"
        left="50%"
        transform="translateX(-50%)"
      >
        An intuitive interface makes it easy for both beginners and experts to use.
      </Text>
    </MotionBox>
  );
}

export default SectionB;
