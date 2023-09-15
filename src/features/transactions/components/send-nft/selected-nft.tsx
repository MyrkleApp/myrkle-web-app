import Button from "@/components/button";
import { Box, Flex, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";
import { MotionImage } from "@/components/motion-elements";

function SelectedNft() {
  return (
    <>
      <Flex
        pos="absolute"
        top="80px"
        ml="50%"
        transform="translateX(-50%)"
        w="calc(100% - 40px)"
        h="calc(100% - 170px)"
        maxH="350px"
        gap={2}
      >
        <Box bg="secondary" w="50%" borderRadius="20px" p={2}>
          <MotionImage
            src={nftImage}
            alt=""
            w="100%"
            maxH="70%"
            aspectRatio={1}
            mb={3}
            borderRadius="20px"
            initial={{ x: 100, y: -100 }}
            animate={{ x: 0, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 70 } }}
          />
          <Text fontSize="sm" mb={1} pl={2} fontWeight="bold">
            Name
          </Text>
          <Text fontSize="sm" pl={2}>
            Jack XX
          </Text>
        </Box>

        <Flex direction="column" w="50%" justify="space-between" gap={2}>
          <Flex
            px={3}
            py={5}
            direction="column"
            // justify="center"
            bg="secondary"
            h="50%"
            borderRadius="10px"
          >
            <Text fontSize="xs" fontWeight="bold" mb={4}>
              Address
            </Text>
            <Text fontSize="xs" fontWeight="bold" letterSpacing={2}>
              BFWOSNOSMDI89WFWSLGESMDFLMOWEI
            </Text>
          </Flex>
          <Flex
            px={3}
            py={3}
            direction="column"
            // justify="space-between"
            bg="secondary"
            h="50%"
            borderRadius="10px"
          >
            <Text fontSize="xs" fontWeight="bold">
              Note
            </Text>
            <Text fontSize="2xs" color="danger">
              On click of the confirm button, an NFT sell ID will be displayed.
            </Text>
            <Text fontSize="2xs" color="danger">
              The receiver of the NFT should lorem ipsum their life away till they get it
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        pos="absolute"
        bottom="0"
        ml="50%"
        transform="translateX(-50%)"
        letterSpacing={1}
        w="calc(100% - 40px)"
      >
        confirm
      </Button>
    </>
  );
}

export default SelectedNft;
