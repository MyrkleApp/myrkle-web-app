import { MotionBox, MotionButton, MotionText } from "@/components/motion-elements";
import landingBlurb from "@/assets/landing-blurb.svg";
import { Box, Image } from "@chakra-ui/react";
import ROUTES from "@/routes";
import { useNavigate } from "react-router-dom";

function SectionI() {
  const navigate = useNavigate();

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
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
        >
          Join Myrkle today
        </MotionText>

        <MotionText
          textAlign="center"
          w="60%"
          mx="auto"
          fontWeight="bold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
        >
          Myrkle is a revolutionary Web3 super app that simplifies digital asset management. With
          seamless integration with XRPL, Myrkle provides essential Web3 functions that enable users
          to easily navigate the XRPL ecosystem. Myrkle empowers users to create and manage fungible
          and non-fungible tokens, swap assets, and manage wallets. With Myrkle, users can fully
          control their digital assets, benefiting from transparent and secure asset management.
          Myrkle is the ultimate solution for those seeking to harness the power of blockchain
          technology and unlock new opportunities and possibilities for their digital assets.
        </MotionText>
      </Box>

      <Box h="50%" pos="absolute" bottom={0} left={0} w="100%">
        <Image src={landingBlurb} alt="" w="100%" />
      </Box>

      <MotionButton
        bg="#fff"
        pos="absolute"
        bottom="80px"
        transform="translateX(-50%)"
        fontWeight="bold"
        p="10px"
        h="45px"
        borderRadius="30px"
        overflow="hidden"
        zIndex={3}
        onClick={() => navigate(ROUTES.AUTH)}
        initial={{ width: 45, right: 0, color: "#fff" }}
        animate={{
          width: [45, 45, 45, 45, 180],
          color: ["#fff", "#fff", "#fff", "#fff", "#000"],
          left: "50%",
          transition: { duration: 0.8 },
        }}
      >
        Get Started
      </MotionButton>

      <MotionBox
        bg="#fff"
        pos="absolute"
        bottom="80px"
        left="42%"
        h="44px"
        w="45px"
        borderRadius="50%"
        initial={{ left: 0 }}
        animate={{ left: "50%", transition: { duration: 0.8 } }}
      />
    </MotionBox>
  );
}

export default SectionI;
