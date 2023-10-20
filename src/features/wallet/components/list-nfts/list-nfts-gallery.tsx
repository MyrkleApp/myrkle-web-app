import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import NftCard from "./nft-card";
import PlusIcon from "@/icons/plus";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useGetAccountNftsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

function ListNftsGallery() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);
  const { data, isLoading } = useGetAccountNftsQuery({ address, net });

  if (isLoading) {
    return (
      <SimpleGrid columns={4} spacing={4} pr={4}>
        <Flex justify="center" align="center" bg="secondary" borderRadius="35px" cursor="pointer">
          <PlusIcon color="#858585" fontSize="5xl" />
        </Flex>
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

  return (
    <SimpleGrid columns={4} spacing={4} pr={4}>
      <Flex
        justify="center"
        align="center"
        bg="secondary"
        borderRadius="35px"
        cursor="pointer"
        aspectRatio={1}
      >
        <PlusIcon color="#858585" fontSize="5xl" />
      </Flex>
      {data?.map((nft: any) => (
        <Box key={nft.id} aspectRatio={1}>
          <NftCard
            uri={nft.uri}
            serial={nft?.serial}
            taxon={nft?.taxon}
            issuer={nft?.issuer}
            fee={nft?.transfer_fee}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ListNftsGallery;
