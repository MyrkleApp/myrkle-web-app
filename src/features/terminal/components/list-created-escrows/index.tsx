import TableHeader from "@/components/table-header";
import { Box, Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";
import ListEscrows from "./list-escrows";

function ListCreatedEscrows() {
  return (
    <TableContainer pr={2} mt={-2}>
      <Table
        variant="simple"
        size="md"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
      >
        <Thead>
          <Tr>
            <TableHeader>Transaction ID</TableHeader>
            <TableHeader>Sender</TableHeader>
            <TableHeader>Receiver</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Redeem Date</TableHeader>
            <TableHeader border="none">Expiry Date</TableHeader>
          </Tr>
        </Thead>
        <Box h="1px"></Box>
        <Tbody pt={3} border="none">
          <ListEscrows />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListCreatedEscrows;
