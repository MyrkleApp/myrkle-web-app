import { Box } from "@chakra-ui/react";
import OfferRow from "./offer-row";
import { selectFromToken, selectToToken } from "../../redux/exchange.selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSortBestOfferMutation } from "@/features/shared/redux/xrp.api";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";

function ListOffers() {
  const network = useSelector(selectNetwork);

  const fromToken = useSelector(selectFromToken);
  const toToken = useSelector(selectToToken);

  const [sortBestOffer] = useSortBestOfferMutation();

  useEffect(() => {
    sortBestOffer({
      buy_type: fromToken.token,
      buy_issuer: fromToken.issuer,
      sell_type: toToken.token,
      sell_issuer: toToken.issuer,
      best_buy: true,
      best_sell: false,
      mainnet: network === "mainnet",
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [fromToken.token, fromToken.issuer, toToken.token, toToken.issuer, sortBestOffer, network]);

  return (
    <Box h="100%" w="100%" pr={2} overflow="auto">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <OfferRow key={i} />
        ))}
    </Box>
  );
}

export default ListOffers;
