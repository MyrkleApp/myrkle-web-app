import { MotionBox } from "@/components/motion-elements";
import landingBlurb from "@/assets/landing-blurb.svg";
import { Box, Button, HStack, Image, Input, Text } from "@chakra-ui/react";
import ArrowRight3Icon from "@/icons/arrow-right-3";
import Footer from "@/layout/home-layout/footer";

function SectionJ() {
  return (
    <MotionBox
      w="100vw"
      h="100vh"
      pos="relative"
      overflow="hidden"
      // bg="#000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <MotionBox
        h="50px"
        bg="#fff"
        pos="absolute"
        left="50%"
        zIndex={3}
        transform="translateX(-50%)"
        initial={{ bottom: "80px", width: 110, borderRadius: "30" }}
        animate={{ top: "25%", width: 50, borderRadius: "50%", transition: { duration: 1 } }}
      />
      <MotionBox
        pos="absolute"
        top="45%"
        left="50%"
        w="330px"
        transform="translate(-50%)"
        zIndex={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
      >
        <Text fontWeight="bold" fontSize="lg" textAlign="center" mb={10}>
          Subscribe to our newsletter
        </Text>

        <HStack>
          <Input w="calc(100% - 70px)" bg="#fff" borderRadius="0" color="#000" />
          <Button w="70px" borderRadius="0 7px 7px 0" bg="secondary" _hover={{ bg: "primary" }}>
            <ArrowRight3Icon fontSize="xl" />
          </Button>
        </HStack>
      </MotionBox>

      <Box h="50%" pos="absolute" bottom={0} left={0} w="100%">
        <Image src={landingBlurb} alt="" w="100%" />
      </Box>

      <Footer />
    </MotionBox>
  );
}

export default SectionJ;
