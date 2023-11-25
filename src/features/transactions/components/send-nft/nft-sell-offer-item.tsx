import { HStack, Image, Spacer, Text, VStack, useToast } from "@chakra-ui/react";
// import nftImage from "@/assets/nft.png";
import CopyIcon from "@/icons/copy";
import { ellipsisAtCenter, nftFormatter } from "@/helpers";
import ToastElement from "@/components/toast-element";
import { useGetNftInfoQuery, useLazyGetNftMetaData2Query } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";
import { useEffect } from "react";

export interface NftSellOfferItemProps {
  id: string;
  offerId: string;
}

function NftSellOfferItem({ id, offerId }: NftSellOfferItemProps) {
  const net = useSelector(selectNet);

  const { isLoading: isNftInfoLoading, data: nftInfoData } = useGetNftInfoQuery({ id, net });
  const [getNftMetaData, { isLoading: isNftMetaDataLoading, data: nftMetaData }] =
    useLazyGetNftMetaData2Query();

  useEffect(() => {
    if (nftInfoData?.uri) {
      getNftMetaData(nftInfoData?.uri);
    }
  }, [getNftMetaData, nftInfoData?.uri]);

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  const handleCopyIconClick = () => {
    const textToCopy = nftMetaData?.name ? offerId : id;
    navigator.clipboard?.writeText(textToCopy);

    toast({
      render: () => <ToastElement />,
    });
  };

  if (isNftInfoLoading || isNftMetaDataLoading) {
    return <Skeleton1 h="50px" borderRadius="0" mb={2} />;
  }

  if (!isNftInfoLoading && !isNftMetaDataLoading && !nftInfoData?.owner) {
    return (
      <HStack h="50px" bg="secondary" p={1.5} pl={5} mb={2} borderRadius="5px">
        <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="xs">
          {id}
        </Text>
        {/* <Text fontSize="xs">{ellipsisAtCenter(id)}</Text> */}
        <Spacer />
        <CopyIcon fill="none" fontSize="lg" mr={3} cursor="pointer" onClick={handleCopyIconClick} />
      </HStack>
    );
  }

  return (
    <HStack h="50px" bg="secondary" p={1.5} mb={2} borderRadius="5px">
      <Image
        src={nftFormatter(nftMetaData?.image)}
        alt=""
        h="100%"
        aspectRatio={1.2}
        borderRadius="5px"
        mr={2}
      />
      <VStack align="flex-start" justify="center">
        <Text fontSize="xs" mb={-4} fontWeight="bold">
          {nftMetaData?.name}
        </Text>
        <Text fontSize="xs">{ellipsisAtCenter(nftInfoData?.issuer || "")}</Text>
      </VStack>
      <Spacer />
      <CopyIcon fill="none" fontSize="lg" mr={3} cursor="pointer" onClick={handleCopyIconClick} />
    </HStack>
  );
}

export default NftSellOfferItem;
