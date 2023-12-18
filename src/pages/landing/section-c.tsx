import { MotionBox } from "@/components/motion-elements";
import c1 from "@/assets/landing-page/c1.png";
import c2 from "@/assets/landing-page/c2.png";
import { Image, Text } from "@chakra-ui/react";
import WhiteRing from "@/components/white-ring";
import { generateAnimateObject } from "@/helpers";

function SectionC() {
  return (
    <MotionBox
      w="100vw"
      h="100vh"
      pos="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <Image src={c1} alt="" pos="absolute" bottom="10%" left={0} h="50%" />
      <Image src={c2} alt="" pos="absolute" right={0} bottom={0} h="80%" />

      <WhiteRing
        initial={{ ...generateAnimateObject(0, 0) }}
        animate={{ ...generateAnimateObject(0, -20) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(0, -20) }}
        animate={{ ...generateAnimateObject(-15, -10) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(-15, -10) }}
        animate={{ ...generateAnimateObject(15, -10) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(15, -10) }}
        animate={{ ...generateAnimateObject(0, 0) }}
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
        get detailed information about the state of your tokens and NFTs.
      </Text>
    </MotionBox>
  );
}

export default SectionC;
