import { MotionBox, MotionText } from "@/components/motion-elements";
import landingBlurb from "@/assets/landing-blurb.svg";
import { Box, Image } from "@chakra-ui/react";

function SectionH() {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          Exchange, Swap, and Trade with Ease
        </MotionText>

        <MotionText
          textAlign="center"
          w="70%"
          mx="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          Myrkle provides a user-friendly platform for seamless digital asset trading, including
          token and NFT swapping and exchanging.
        </MotionText>
      </Box>

      <Box h="50%" pos="absolute" bottom={0} left={0} w="100%">
        <Image src={landingBlurb} alt="" w="100%" />
      </Box>
    </MotionBox>
  );
}

export default SectionH;
