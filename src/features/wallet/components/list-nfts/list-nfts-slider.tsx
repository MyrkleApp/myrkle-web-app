import ArrowLeftIcon from "@/icons/arrow-left";
import ArrowRightIcon from "@/icons/arrow-right";
import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { useRef } from "react";
import NftCard from "./nft-card";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { useGetAccountNftsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

function ListNftsSlider() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading, isFetching } = useGetAccountNftsQuery({ address, net });

  const containerRef = useRef<any>(null);

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += 500;
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft -= 500;
  };

  if (isLoading || isFetching) {
    return (
      <Box pos="relative" h="100%">
        <Box
          h="100%"
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
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Box key={i} display="inline-block" h="100%" aspectRatio={1} mr={3}>
                <Skeleton1 w="100%" h="100%" />
              </Box>
            ))}
        </Box>
      </Box>
    );
  }

  if (!data?.length) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text>You have no nfts to display</Text>
      </Flex>
    );
  }

  return (
    <Box pos="relative" h="100%">
      <Box
        ref={containerRef}
        h="100%"
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
        {data?.map((nft: any) => (
          <Box key={nft.id} display="inline-block" h="100%" aspectRatio={1} mr={3}>
            <NftCard
              uri={nft?.uri}
              serial={nft?.serial}
              taxon={nft?.taxon}
              issuer={nft?.issuer}
              fee={nft?.transfer_fee}
              flag={nft?.flags}
            />
          </Box>
        ))}
      </Box>

      <Circle
        bg="darker"
        pos="absolute"
        size="50px"
        top="50%"
        left={0}
        transform="translate(-15px, -50%)"
        cursor="pointer"
        onClick={scrollLeft}
      >
        <Circle bg="dark" size="35px" _hover={{ bg: "primary" }}>
          <ArrowLeftIcon />
        </Circle>
      </Circle>

      <Circle
        bg="darker"
        pos="absolute"
        size="50px"
        top="50%"
        right={0}
        transform="translate(15px, -50%)"
        cursor="pointer"
        onClick={scrollRight}
      >
        <Circle bg="dark" size="35px" _hover={{ bg: "primary" }}>
          <ArrowRightIcon />
        </Circle>
      </Circle>
    </Box>
  );
}

export default ListNftsSlider;
