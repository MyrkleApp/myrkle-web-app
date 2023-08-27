import { Box } from "@chakra-ui/react";
import TxnCard from "./txn-card";

function ListTxns() {
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
