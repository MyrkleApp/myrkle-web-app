import ArrowLeftIcon from "@/icons/arrow-left";
import ArrowRightIcon from "@/icons/arrow-right";
import { Box, Circle } from "@chakra-ui/react";
import { useRef } from "react";
import NftCard from "./nft-card";

function ListNftsSlider() {
  const containerRef = useRef<any>(null);

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += 500;
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft -= 500;
  };

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
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Box key={i} display="inline-block" h="100%" aspectRatio={1} mr={3}>
              <NftCard />
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
