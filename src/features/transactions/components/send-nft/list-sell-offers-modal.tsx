import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, HStack, Spacer, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import NftSellOfferItem from "./nft-sell-offer-item";
import { useGetAllNftOffersQuery } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";

export interface ListSellOffersModalProps {
  id: string;
  handleClose: () => void;
}

function ListSellOffersModal({ id, handleClose }: ListSellOffersModalProps) {
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetAllNftOffersQuery({ id, net });

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
      h="450px"
      w="350px"
      px={7}
      py={5}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack>
        <ItemLabel title="List of Sell offers" fontSize="sm" />
        <Spacer />
        <CloseButton onClick={handleClose} />
      </HStack>

      <Box pr={1} mb={4} mt={3} h="calc(100% - 70px)" overflow="hidden auto">
        <RenderSellOffers isLoading={isLoading}>
          {data?.sell?.map((_: any, i: number) => <NftSellOfferItem key={i} />)}
        </RenderSellOffers>
      </Box>
    </MotionBox>
  );
}

const RenderSellOffers = ({ children, isLoading }: any) => {
  if (isLoading) {
    return (
      <>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} />
          ))}
      </>
    );
  }

  return <>{children}</>;
};

export default ListSellOffersModal;
