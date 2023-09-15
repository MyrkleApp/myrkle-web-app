import { SimpleGrid } from "@chakra-ui/react";
import NftItem from "./nft-item";

export interface ListNftItemsProps {
  handleItemClick: () => void;
}

function ListNftItems({ handleItemClick }: ListNftItemsProps) {
  return (
    <SimpleGrid columns={4} spacing={4} pr={4}>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <NftItem key={i} handleClick={handleItemClick} />
        ))}
    </SimpleGrid>
  );
}

export default ListNftItems;
