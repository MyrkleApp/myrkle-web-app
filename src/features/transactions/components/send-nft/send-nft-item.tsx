import { Box, Flex, Image, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";
import { useGetNftMetaData2Query } from "@/features/shared/redux/token.api";
import Skeleton1 from "@/components/skeleton";
import { nftFormatter } from "@/helpers";

export interface SendNftItemProps {
  id: string;
  uri: string;
  handleClick: (value: any) => void;
}

function SendNftItem({ id, uri, handleClick }: SendNftItemProps) {
  const { data, isLoading, isError } = useGetNftMetaData2Query(uri);

  if (isLoading) {
    return <Skeleton1 w="100%" h="100%" />;
  }

  if (isError) {
    return (
      <Flex
        justify="center"
        align="center"
        w="100%"
        h="100%"
        border="1px solid red"
        borderRadius="35px"
      >
        <Text fontSize="sm" color="danger">
          Error fetching nft
        </Text>
      </Flex>
    );
  }

  return (
    <Box cursor="pointer" onClick={() => handleClick({ id, ...data })}>
      <Image
        src={nftFormatter(data?.image) || nftImage}
        alt=""
        w="100%"
        aspectRatio={1}
        objectFit="cover"
        borderRadius="20px"
        mb={2}
      />
      <Text fontSize="sm">{data?.name}</Text>
    </Box>
  );
}

export default SendNftItem;
