import { MotionBox } from "@/components/motion-elements";
import { Box, SimpleGrid, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import SendNftItem from "./send-nft-item";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useGetAccountNftsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

export interface SelectNftModalProps {
  handleClose: () => void;
  handleNftItemClick: (value: any) => void;
}

function SelectNftModal({ handleClose, handleNftItemClick }: SelectNftModalProps) {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetAccountNftsQuery({ address, net });

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="80%"
      w="65%"
      py={6}
      px={8}
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Text fontWeight="bold" mb={3}>
        Select NFT
      </Text>

      <Box h="calc(100% - 50px)" overflow="hidden auto">
        <RenderNftList isLoading={isLoading}>
          <SimpleGrid columns={4} spacing={4} pr={4}>
            {data?.map((nft: any) => (
              <SendNftItem
                key={nft.id}
                id={nft.id}
                uri={nft.uri}
                handleClick={handleNftItemClick}
              />
            ))}
          </SimpleGrid>
        </RenderNftList>
      </Box>
    </MotionBox>
  );
}

const RenderNftList = ({ children, isLoading }: any) => {
  if (isLoading) {
    return (
      <SimpleGrid columns={4} spacing={4} pr={4}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} aspectRatio={1.1}>
              <Skeleton1 w="100%" h="100%" />
            </Box>
          ))}
      </SimpleGrid>
    );
  }

  return <>{children}</>;
};

export default SelectNftModal;
