import ItemLabel from "@/components/item-label";
import { Box } from "@chakra-ui/react";
import ManagerCard from "./manager-card";

function Manager() {
  return (
    <Box>
      <ItemLabel title="Manager" />
      <ManagerCard title="Use Account" subtitle="select account" />
      <ManagerCard title="connect external wallet" subtitle="choose wallet" />
    </Box>
  );
}

export default Manager;
