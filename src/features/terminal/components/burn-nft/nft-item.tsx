import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";
import { useGetNftMetaDataQuery } from "@/features/shared/redux/xrp.api";
import { nftFormatter } from "@/helpers";

export interface NftItemProps {
  id: string;
  issuer: string;
  handleClick: (data: any) => void;
}

function NftItem({ id, issuer, handleClick }: NftItemProps) {
  const net = useSelector(selectNet);

  const { data, isLoading, isError } = useGetNftMetaDataQuery({ id, net });

  if (isLoading) {
    return <Skeleton1 w="100%" h="auto" aspectRatio={1} />;
  }

  if (isError) {
    return (
      <Flex
        justify="center"
        align="center"
        border="1px solid red"
        aspectRatio={1}
        borderRadius="20px"
      >
        <Text fontSize="sm" color="danger">
          Error fetching nft
        </Text>
      </Flex>
    );
  }

  return (
    <Box cursor="pointer" onClick={() => handleClick({ id, issuer, ...data })}>
      <Image
        src={nftFormatter(data?.image)}
        alt=""
        w="100%"
        aspectRatio={1}
        objectFit="cover"
        borderRadius="20px"
      />
    </Box>
  );
}

export default NftItem;
