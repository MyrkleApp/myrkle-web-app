import ArrowLeftIcon from "@/icons/arrow-left";
import { Box, Circle, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@/components/button";
import { useRef } from "react";
import ArrowRight2Icon from "@/icons/arrow-right-2";
import ArrowLeft2Icon from "@/icons/arrow-left-2";
import NftEditables from "./nft-editables";
import { useGetNftMetaData2Query } from "@/features/shared/redux/xrp.api";
import { nftFormatter } from "@/helpers";
import Skeleton1 from "@/components/skeleton";

function NftDetailContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("uri") || "";

  const { data, isLoading } = useGetNftMetaData2Query(uri);

  const containerRef = useRef<any>(null);

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft -= 300;
  };

  if (isLoading) {
    return (
      <Flex justify="space-between" h="100%" gap={4}>
        <Flex direction="column" justify="space-between" w="50%">
          <HStack>
            <ArrowLeftIcon cursor="pointer" mr={5} onClick={() => navigate(-1)} />
            <Skeleton1 h="50px" borderRadius="0" w="100%" />
          </HStack>
          <Skeleton1 h="30%" borderRadius="0" />
          <Skeleton1 h="50%" borderRadius="0" />
        </Flex>

        <Flex direction="column" justify="space-between" w="50%">
          <Skeleton1 h="calc(100% - 130px)" borderRadius="0" />
          <Skeleton1 h="110px" borderRadius="0" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justify="space-between" h="100%" gap={4}>
      <Box w="50%" pos="relative">
        <HStack mb={5}>
          <ArrowLeftIcon cursor="pointer" mr={5} onClick={() => navigate(-1)} />
          <Image
            src={nftFormatter(data?.image)}
            alt="xrp"
            w="40px"
            h="40px"
            objectFit="cover"
            borderRadius="50%"
          />
          <Text fontSize="sm" fontWeight="bold">
            {data?.name}
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
          {data?.description}
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
        <Image
          src={nftFormatter(data?.image)}
          alt=""
          w="100%"
          h="calc(100% - 130px)"
          borderRadius="20px"
        />
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
            {data?.attributes?.map((attribute: any, i: number) => (
              <Box
                key={i}
                display="inline-block"
                bg="dark"
                borderRadius="15px"
                h="100%"
                aspectRatio={1.1 / 1}
                mr={3}
              >
                <Flex direction="column" mt={5}>
                  <Text textAlign="center" fontSize="xs">
                    {attribute.trait_type}
                  </Text>
                  <Text textAlign="center" fontSize="xs" fontWeight="bold">
                    {attribute.value}
                  </Text>
                  {/* <Text textAlign="center" fontSize="xs">
                      5.56%
                    </Text> */}
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
