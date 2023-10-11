import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, HStack, SimpleGrid, Spacer, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import NftItem from "./nft-item";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useGetAccountNftsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

export interface BurnListModalProps {
  handleClose: () => void;
  handleItemClick: (data: any) => void;
}

function BurnListModal({ handleClose, handleItemClick }: BurnListModalProps) {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetAccountNftsQuery({ address, net });
  console.log(data);

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
      h="calc(100% - 20px)"
      w="calc(100% - 20px)"
      py={6}
      px="60px"
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack mb={3}>
        <Spacer />
        <CloseButton onClick={handleClose} />
      </HStack>

      <Box h="calc(100% - 50px)" overflow="hidden auto">
        <RenderList isLoading={isLoading}>
          <SimpleGrid columns={4} spacing={4} pr={4}>
            {data?.map((nft: any, i: number) => (
              <NftItem key={i} id={nft.id} issuer={nft.issuer} handleClick={handleItemClick} />
            ))}
          </SimpleGrid>
        </RenderList>
      </Box>
    </MotionBox>
  );
}

const RenderList = ({ children, isLoading }: any) => {
  if (isLoading) {
    return (
      <SimpleGrid columns={4} spacing={4} pr={4}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} aspectRatio={1}>
              <Skeleton1 w="100%" h="100%" />
            </Box>
          ))}
      </SimpleGrid>
    );
  }

  return <>{children}</>;
};

export default BurnListModal;
