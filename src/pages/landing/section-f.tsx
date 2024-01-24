import { MotionBox, MotionText } from "@/components/motion-elements";
import landingBlurb from "@/assets/landing-blurb.svg";
import { Box, Image } from "@chakra-ui/react";

function SectionF() {
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
      <Box pos="absolute" top="22%" left="50%" w="70%" transform="translate(-50%)" zIndex={1}>
        <MotionText
          className="font-face-proxima-nova-black"
          fontSize="40px"
          textAlign="center"
          mb="40px"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 1 } }}
        >
          The future of Digital tokens and NFT creation
        </MotionText>

        <MotionText
          textAlign="center"
          w="70%"
          mx="auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 2 } }}
        >
          Myrkle simplifies creating and managing digital assets. Easily create and manage fungible
          and non-fungible tokens in one place. Experience the future of decentralized asset
          management with Myrkle.
        </MotionText>
      </Box>

      <Box h="50%" pos="absolute" bottom={0} left={0} w="100%">
        <Image src={landingBlurb} alt="" w="100%" />
      </Box>
    </MotionBox>
  );
}

export default SectionF;
