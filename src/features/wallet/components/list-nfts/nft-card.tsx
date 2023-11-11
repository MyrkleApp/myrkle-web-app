import { Box, Flex, Image, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";
import Button from "@/components/button";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import { useGetNftMetaData2Query } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";
import { nftFormatter } from "@/helpers";

export interface NftCardProps {
  uri: string;
  serial: string;
  taxon: string;
  issuer: string;
  fee: string;
  flag: string;
}

function NftCard({ uri, serial, taxon, issuer, fee, flag }: NftCardProps) {
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
    <Link to={ROUTES.WALLET_NFT_DETAIL_FUNC(uri, serial, taxon, issuer, fee, flag)}>
      <Box
        w="100%"
        h="100%"
        borderRadius="35px"
        border="4px solid #515151"
        overflow="hidden"
        position="relative"
        cursor="pointer"
        _hover={{
          "& > div": {
            bottom: "0",
            transition: "0.1s linear all",
          },
        }}
      >
        <Image
          src={nftFormatter(data?.image) || nftImage}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
        />

        <Flex
          align="center"
          justify="space-between"
          pos="absolute"
          bottom="-30%"
          left={0}
          h="30%"
          w="100%"
          px={5}
          bg="#1d1c1c"
          transition="0.1s linear all"
          gap={2}
        >
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="sm">
            {data?.name}
          </Text>
          <Button w="120px">Send</Button>
        </Flex>
      </Box>
    </Link>
  );
}

export default NftCard;
