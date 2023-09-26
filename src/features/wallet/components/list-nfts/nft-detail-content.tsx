import ArrowLeftIcon from "@/icons/arrow-left";
import { Box, Circle, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import xrpLogo from "@/assets/xrp-logo.svg";
import nftImage from "@/assets/nft.png";
import Button from "@/components/button";
import { useRef } from "react";
import ArrowRight2Icon from "@/icons/arrow-right-2";
import ArrowLeft2Icon from "@/icons/arrow-left-2";
import NftEditables from "./nft-editables";

function NftDetailContent() {
  const navigate = useNavigate();

  const containerRef = useRef<any>(null);

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft -= 300;
  };

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
            Details
          </Text>

          <Box
            w="100%"
            h="calc(100% - 35px)"
            pos="absolute"
            bottom={0}
            bg="#292929"
            borderRadius="15px"
            zIndex={0}
          >
            <Box
              w="60%"
              h="calc(100% - 20px)"
              pos="absolute"
              top="10px"
              right="10px"
              bg="dark"
              borderRadius="15px"
              zIndex={-1}
            />
            <NftEditables />
          </Box>
        </Box>
      </Box>

      <Flex direction="column" justify="space-between" w="50%">
        <Image src={nftImage} alt="" w="100%" h="calc(100% - 130px)" borderRadius="20px" />
        <Box h="120px" pos="relative">
          <Text fontSize="xs" fontWeight="bold">
            Attributes
          </Text>
          <Box
            ref={containerRef}
            h="97px"
            borderRadius="10px"
            bg="dark"
            py={2}
            px={3}
            overflowX="scroll"
            whiteSpace="nowrap"
            sx={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <Box
                  key={i}
                  display="inline-block"
                  bg="dark"
                  borderRadius="15px"
                  h="100%"
                  aspectRatio={1.1 / 1}
                  mr={3}
                >
                  <Flex direction="column" mt={2}>
                    <Text textAlign="center" fontSize="xs">
                      Background
                    </Text>
                    <Text textAlign="center" fontSize="xs" fontWeight="bold">
                      Red
                    </Text>
                    <Text textAlign="center" fontSize="xs">
                      5.56%
                    </Text>
                  </Flex>
                </Box>
              ))}
          </Box>
          <Circle
            pos="absolute"
            left={1}
            top="50%"
            transform="translateY(-50% - 30px)"
            size="20px"
            bg="gray"
            cursor="pointer"
            onClick={scrollRight}
          >
            <ArrowRight2Icon fontSize="xs" fill="none" mr={-0.5} />
          </Circle>
          <Circle
            pos="absolute"
            right={1}
            top="50%"
            transform="translateY(-50% - 30px)"
            size="20px"
            bg="gray"
            cursor="pointer"
            onClick={scrollLeft}
          >
            <ArrowLeft2Icon fontSize="xs" fill="none" ml={-0.5} />
          </Circle>
        </Box>
      </Flex>
    </Flex>
  );
}

export default NftDetailContent;
