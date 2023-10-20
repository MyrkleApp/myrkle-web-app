import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Skeleton1 from "@/components/skeleton";
import { useGetNftMetaData2Query } from "@/features/shared/redux/xrp.api";
import { nftFormatter } from "@/helpers";

export interface NftItemProps {
  id: string;
  uri: string;
  issuer: string;
  handleClick: (data: any) => void;
}

function NftItem({ id, uri, issuer, handleClick }: NftItemProps) {
  const { data, isLoading, isError } = useGetNftMetaData2Query(uri);

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
    <Box cursor="pointer" onClick={() => handleClick({ id, uri, issuer, ...data })}>
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
