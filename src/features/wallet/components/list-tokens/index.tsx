import { Box } from "@chakra-ui/react";
import TokenCard from "./token-card";

function ListTokens() {
  return (
    <Box pr={5}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <TokenCard key={i} />
        ))}
    </Box>
  );
}

export default ListTokens;
