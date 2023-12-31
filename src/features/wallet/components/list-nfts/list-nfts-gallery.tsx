import { Box, Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import NftCard from "./nft-card";
import PlusIcon from "@/icons/plus";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useGetAccountNftsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";
import Backdrop from "@/components/backdrop";
import AddNftModal from "@/features/shared/components/add-nft-modal";

function ListNftsGallery() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);
  const { data, isLoading, isFetching } = useGetAccountNftsQuery({ address, net });

  const { isOpen: isAddNftOpen, onOpen: onOpenAddNft, onClose: onCloseAddNft } = useDisclosure();

  const handleCloseAddNft = () => {
    onCloseAddNft();
  };

  if (isLoading || isFetching) {
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

  if (!data?.length) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text>You have no nfts to display</Text>
      </Flex>
    );
  }

  return (
    <>
      <SimpleGrid columns={4} spacing={4} pr={4}>
        <Flex
          justify="center"
          align="center"
          bg="secondary"
          borderRadius="35px"
          cursor="pointer"
          aspectRatio={1}
          onClick={onOpenAddNft}
        >
          <PlusIcon color="#858585" fontSize="5xl" />
        </Flex>
        {data?.map((nft: any) => (
          <Box key={nft.id} aspectRatio={1}>
            <NftCard
              id={nft?.id}
              uri={nft.uri}
              serial={nft?.serial}
              taxon={nft?.taxon}
              issuer={nft?.issuer}
              fee={nft?.transfer_fee}
              flag={nft?.flags}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Backdrop isOpen={isAddNftOpen}>
        <AddNftModal handleClose={handleCloseAddNft} />
      </Backdrop>
    </>
  );
}

export default ListNftsGallery;
