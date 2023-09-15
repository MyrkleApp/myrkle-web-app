import { SimpleGrid } from "@chakra-ui/react";
import SendNftItem from "./send-nft-item";

export interface ListSendNftProps {
  handleNftItemClick: () => void;
}

function ListSendNft({ handleNftItemClick }: ListSendNftProps) {
  return (
    <SimpleGrid columns={4} spacing={4} pr={4}>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <SendNftItem key={i} handleClick={handleNftItemClick} />
        ))}
    </SimpleGrid>
  );
}

export default ListSendNft;
