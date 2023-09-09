import TableHeader from "@/components/table-header";
import { Box, Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";
import ListChecks from "./list-checks";

function ListCreatedChecks() {
  return (
    <TableContainer pr={2} mt={-5}>
      <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
        <Thead>
          <Tr>
            <TableHeader>Check ID</TableHeader>
            <TableHeader>Sender</TableHeader>
            <TableHeader>Receiver</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Expiry Date</TableHeader>
            <TableHeader border="none">Action</TableHeader>
          </Tr>
        </Thead>
        <Box h="1px"></Box>
        <Tbody pt={3} border="none">
          <ListChecks />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListCreatedChecks;
