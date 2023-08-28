import ArrowLeftIcon from "@/icons/arrow-left";
import { Box, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import xrpLogo from "@/assets/xrp-logo.svg";
import nftImage from "@/assets/nft.png";
import Button from "@/components/button";

function NftDetailContent() {
  const navigate = useNavigate();

  return (
    <Flex justify="space-between" h="100%" gap={4}>
      <Box w="50%" pos="relative">
        <HStack mb={5}>
          <ArrowLeftIcon cursor="pointer" mr={5} onClick={() => navigate(-1)} />
          <Image src={xrpLogo} alt="xrp" h="40px" />
          <Text fontSize="sm" fontWeight="bold">
            Jackk X
          </Text>
          <Spacer />
          <Button h="27px" p="15px 20px" bg="primary" fontSize="xs" _hover={{ bg: "primary" }}>
            Send
          </Button>
        </HStack>

        <Text fontSize="xs" fontWeight="bold" mb={3}>
          Description
        </Text>
        <Text fontSize="xs" mb={3}>
          Lorem ipsum dolor sit amet consectetur. Aliquet sed dictum interdum a. Cursus ornare hac
          fringilla ac. Lorem ipsum dolor sit amet consectetur. Aliquet sed dictum interdum a.
          Cursus ornare hac fringilla ac.
        </Text>

        <Box w="100%" h="60%" pos="absolute" bottom={0}>
          <Text fontSize="xs" fontWeight="bold">
            Description
          </Text>

          <Box
            w="100%"
            h="calc(100% - 35px)"
            pos="absolute"
            bottom={0}
            bg="#292929"
            borderRadius="15px"
          >
            <Box
              w="65%"
              h="calc(100% - 20px)"
              pos="absolute"
              top="10px"
              right="10px"
              bg="dark"
              borderRadius="15px"
            />
          </Box>
        </Box>
      </Box>

      <Box w="50%" border="1px solid red">
        <Image src={nftImage} alt="" w="100%" h="75%" />
      </Box>
    </Flex>
  );
}

export default NftDetailContent;
