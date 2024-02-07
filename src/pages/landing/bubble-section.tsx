import { Box, Image, Text } from "@chakra-ui/react";
import ellipse1 from "@/assets/landing-page/ellipse-1.png";
import ellipse2 from "@/assets/landing-page/ellipse-2.png";
import ellipse3 from "@/assets/landing-page/ellipse-3.png";
import ellipse4 from "@/assets/landing-page/ellipse-4.png";
import ellipse5 from "@/assets/landing-page/ellipse-5.png";
import ellipse6 from "@/assets/landing-page/ellipse-6.png";
import ellipse7 from "@/assets/landing-page/ellipse-7.png";
import ellipse8 from "@/assets/landing-page/ellipse-8.png";
// import ellipse9 from "@/assets/landing-page/ellipse-9.png"

function BubbleSection() {
  return (
    <Box id="about" mt="200px" h="1200px" pos="relative">
      <Image src={ellipse1} pos="absolute" alt="" top="15px" left="65%" />
      <Image src={ellipse2} pos="absolute" alt="" top="23%" left="30%" />
      <Image src={ellipse3} pos="absolute" alt="" top="25%" left="70%" />
      <Image src={ellipse4} pos="absolute" alt="" top="55%" left="60%" />
      <Image src={ellipse5} pos="absolute" alt="" top="50%" left="30%" />
      <Image src={ellipse6} pos="absolute" alt="" top="60%" left="15%" />
      <Image src={ellipse7} pos="absolute" alt="" top="80%" left="55%" />
      <Image src={ellipse8} pos="absolute" alt="" top="90%" left="55%" />

      <Box zIndex={6} h="100%" pos="absolute" ml="25px">
        <Text
          className="font-face-proxima-nova-black"
          fontSize="40px"
          textAlign="center"
          mb="60px"
          maxW="40%"
          ml="30%"
        >
          The future of Digital tokens and NFT creation
        </Text>
        <Text fontWeight="bold" fontSize="sm" textAlign="center" mb="100px" maxW="40%" ml="30%">
          Myrkle simplifies creating and managing digital assets. Easily create and manage fungible
          and non-fungible tokens in one place. Experience the future of decentralized asset
          management with Myrkle.
        </Text>

        <Text
          lineHeight={1.2}
          className="font-face-proxima-nova-black"
          fontSize="40px"
          textAlign="center"
          mb="60px"
          maxW="40%"
          ml="30%"
        >
          Unlock the Power of Digital Asset Ownership with Myrkle
        </Text>
        <Text fontWeight="bold" fontSize="sm" textAlign="center" mb="100px" maxW="40%" ml="30%">
          Myrkle is the one-stop-shop for managing your digital assets, providing a seamless
          experience for tokens and NFTs on multiple networks, giving you complete control and
          ownership of your assets.
        </Text>

        <Text
          className="font-face-proxima-nova-black"
          fontSize="40px"
          textAlign="center"
          mb="60px"
          maxW="40%"
          ml="30%"
        >
          Exchange, Swap, and Trade with Ease
        </Text>
        <Text
          fontWeight="bold"
          fontSize="sm"
          textAlign="center"
          mb="100px"
          maxW="40%"
          ml="30%"
          zIndex={100}
        >
          Myrkle provides a user-friendly platform for seamless digital asset trading, including
          token and NFT swapping and exchanging.
        </Text>
      </Box>
    </Box>
  );
}

export default BubbleSection;
