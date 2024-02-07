import { MotionBox, MotionImage } from "@/components/motion-elements";
import { Flex, Image, Text } from "@chakra-ui/react";
import spark1 from "@/assets/landing-page/spark1.png";
import spark2 from "@/assets/landing-page/spark2.png";
import a1 from "@/assets/landing-page/a1.png";
import a2 from "@/assets/landing-page/a2.png";
import a3 from "@/assets/landing-page/a3.png";
import a4 from "@/assets/landing-page/a4.png";

function SectionA() {
  return (
    <MotionBox
      id="home"
      w="100vw"
      h="100vh"
      pos="relative"
      overflow="hidden"
      initial={{ opacity: 0, y: 200 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } }}
    >
      <Flex justify="space-between" align="center" pos="absolute" w="100%" top="15%">
        <Image src={spark1} alt="" w="calc(50% - 200px)" />
        <Text w="450px" textAlign="center" fontSize="45px" fontWeight="bold">
          Your gateway to a{" "}
          <Text as="span" color="success">
            decentralized
          </Text>{" "}
          world
        </Text>
        <Image src={spark2} alt="" right="0" w="calc(50% - 200px)" />
      </Flex>

      <MotionImage
        src={a1}
        alt=""
        pos="absolute"
        bottom={0}
        left={0}
        w="20%"
        initial={{ bottom: -30 }}
        animate={{ bottom: 0, transition: { duration: 0.5, delay: 0.5 } }}
      />
      <Image src={a2} alt="" pos="absolute" bottom={0} left="19%" w="48%" />
      <MotionImage
        src={a3}
        alt=""
        pos="absolute"
        bottom={0}
        left="45%"
        zIndex={5}
        w="43%"
        initial={{ bottom: -30 }}
        animate={{ bottom: 0, transition: { duration: 0.5, delay: 0.5 } }}
      />
      <Image src={a4} alt="" pos="absolute" bottom={0} right={0} zIndex={4} w="27%" />
    </MotionBox>
  );
}

export default SectionA;
