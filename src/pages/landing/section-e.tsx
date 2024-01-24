import { MotionBox } from "@/components/motion-elements";
import e1 from "@/assets/landing-page/e1.png";
import e2 from "@/assets/landing-page/e2.png";
import { Image, Text } from "@chakra-ui/react";
import WhiteRing from "@/components/white-ring";
import { generateAnimateObject } from "@/helpers";

function SectionE() {
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
      <Image src={e1} alt="" pos="absolute" bottom="10%" left={0} h="50%" />
      <Image src={e2} alt="" pos="absolute" right={0} bottom={0} h="80%" />

      <WhiteRing
        initial={{ ...generateAnimateObject(-15, -10) }}
        whileInView={{ ...generateAnimateObject(15, -10) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(15, -10) }}
        whileInView={{ ...generateAnimateObject(0, 0) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(0, 0) }}
        whileInView={{ ...generateAnimateObject(0, -20) }}
      />
      <WhiteRing
        initial={{ ...generateAnimateObject(0, -20) }}
        whileInView={{ ...generateAnimateObject(-15, -10) }}
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
        creation and management of tokens and NFTs.
      </Text>
    </MotionBox>
  );
}

export default SectionE;
