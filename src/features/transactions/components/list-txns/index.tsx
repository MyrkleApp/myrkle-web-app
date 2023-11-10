import { Box } from "@chakra-ui/react";
import TxnCard from "./txn-card";
import { useLazyGetPaymentTransactionsQuery } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";
import { useEffect } from "react";

function ListTxns() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const [getPaymentTxns, { data, isLoading }] = useLazyGetPaymentTransactionsQuery();

  useEffect(() => {
    if (address && net) {
      getPaymentTxns({ address, net });
    }
  }, [address, getPaymentTxns, net]);

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
      {data?.sent?.map((txn: any) => <TxnCard key={txn.txid} txn={txn} isCreditTxn={false} />)}
      {data?.received?.map((txn: any) => <TxnCard key={txn.txid} txn={txn} isCreditTxn={true} />)}
    </Box>
  );
}

export default ListTxns;
