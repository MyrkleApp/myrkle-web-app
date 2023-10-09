import { Box } from "@chakra-ui/react";
import TxnCard from "./txn-card";
import { useGetPaymentTransactionsQuery } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";

function ListTxns() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { isLoading } = useGetPaymentTransactionsQuery({ address, net });

  if (isLoading) {
    return (
      <Box pr={2}>
        {Array(15)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="60px" borderRadius="0" mb={3} />
          ))}
      </Box>
    );
  }
  return (
    <Box pr={2}>
      {Array(15)
        .fill(null)
        .map((_, i) => (
          <TxnCard key={i} />
        ))}
    </Box>
  );
}

export default ListTxns;
