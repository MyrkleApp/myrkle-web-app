import { Flex } from "@chakra-ui/react";
import TokenCard from "./token-card";

function ListTokens() {
  return (
    <Flex direction="column" h="100%" gap={2}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <TokenCard key={i} />
        ))}
    </Flex>
  );
}

export default ListTokens;
