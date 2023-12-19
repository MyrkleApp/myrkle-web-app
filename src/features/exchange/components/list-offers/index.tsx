import { Box, Flex, Text } from "@chakra-ui/react";
import OfferRow from "./offer-row";
import { selectFromToken, selectToToken } from "../../redux/exchange.selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSortBestOfferMutation } from "@/features/shared/redux/xrp.api";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";

function ListOffers() {
  const network = useSelector(selectNetwork);

  const fromToken = useSelector(selectFromToken);
  const toToken = useSelector(selectToToken);

  const [sortBestOffer, { data, isLoading, isError }] = useSortBestOfferMutation();

  useEffect(() => {
    sortBestOffer({
      buy_type: toToken.token,
      buy_issuer: toToken.issuer,
      sell_type: fromToken.token,
      sell_issuer: fromToken.issuer,
      best_buy: true,
      best_sell: false,
      mainnet: network === "mainnet",
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [fromToken.token, fromToken.issuer, toToken.token, toToken.issuer, sortBestOffer, network]);

  if (isLoading) {
    return (
      <Box h="100%" w="100%" pr={2} overflow="auto">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="calc(50% - 10px)" borderRadius="0" mb={2} />
          ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text>An error occured</Text>
      </Flex>
    );
  }

  if (!data?.length) {
    return (
      <Flex h="100%" justify="center" align="center">
        <Text fontSize="lg" fontWeight="bold">
          No data to display
        </Text>
      </Flex>
    );
  }

  return (
    <Box h="100%" w="100%" pr={2} overflow="auto">
      {data?.map((offer: any, i: number) => <OfferRow key={i} offer={offer} />)}
    </Box>
  );
}

export default ListOffers;
