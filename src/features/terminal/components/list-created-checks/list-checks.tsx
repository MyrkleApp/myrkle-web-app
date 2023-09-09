import Button from "@/components/button";
import ShowDetailsOnHover from "@/components/show-details-on-hover";
import { ellipsisAtCenter } from "@/helpers";
import { HStack, Td, Tr } from "@chakra-ui/react";

function ListChecks() {
  return (
    <>
      {Array(13)
        .fill(null)
        .map((_, i) => (
          <Tr key={i} bg="#333333">
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              UEU9478B9743
            </Td>
            <Td>
              <ShowDetailsOnHover
                fullText="UEU9478B9743UEU9478B9743"
                shortText={ellipsisAtCenter("UEU9478B9743UEU9478B9743")}
                color="danger"
              />
            </Td>
            <Td>
              <ShowDetailsOnHover
                fullText="UEU9478B9743UEU9478B9743"
                shortText={ellipsisAtCenter("UEU9478B9743UEU9478B9743")}
                color="primary"
              />
            </Td>
            <Td textAlign="center" fontSize="sm">
              2.04
            </Td>
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              03.02.2023
            </Td>
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              <HStack>
                <Button bg="danger" h="35px" px="35px">
                  Cancel
                </Button>
                <Button bg="primary" h="35px" px="35px">
                  Check
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
    </>
  );
}

export default ListChecks;
