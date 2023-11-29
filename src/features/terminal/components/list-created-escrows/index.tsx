import TableHeader from "@/components/table-header";
import { Box, Flex, Table, TableContainer, Tbody, Text, Thead, Tr } from "@chakra-ui/react";
import ListEscrows from "./list-escrows";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useGetAccountEscrowsQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

function ListCreatedEscrows() {
  const net = useSelector(selectNet);
  const address = useSelector(selectAddress);

  const { data, isLoading, isFetching } = useGetAccountEscrowsQuery({ address, net });

  if (isLoading || isFetching) {
    return (
      <>
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} borderRadius="0" h="50px" mb={2} mr={2} />
          ))}
      </>
    );
  }

  if (!data?.sent?.length && !data?.received?.length) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text fontSize="lg">You don't have any escrows yet.</Text>
      </Flex>
    );
  }

  return (
    <TableContainer pr={2} mt={-2}>
      <Table
        variant="simple"
        size="md"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
      >
        <Thead>
          <Tr>
            <TableHeader>Prev Transaction ID</TableHeader>
            <TableHeader>Sender</TableHeader>
            <TableHeader>Receiver</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Redeem Date</TableHeader>
            <TableHeader>Expiry Date</TableHeader>
            <TableHeader border="none">Action</TableHeader>
          </Tr>
        </Thead>
        <Box h="1px"></Box>
        <Tbody pt={3} border="none">
          <ListEscrows sent={data?.sent} received={data?.received} />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListCreatedEscrows;
