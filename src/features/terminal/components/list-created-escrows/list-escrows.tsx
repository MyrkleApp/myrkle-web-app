import ShowDetailsOnHover from "@/components/show-details-on-hover";
import { ellipsisAtCenter } from "@/helpers";
import { Td, Tr } from "@chakra-ui/react";

function ListEscrows() {
  return (
    <>
      {Array(13)
        .fill(null)
        .map((_, i) => (
          <Tr key={i} bg="#333333">
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              <ShowDetailsOnHover
                fullText="UEU9478B9743UEU9478B9743"
                shortText={ellipsisAtCenter("UEU9478B9743UEU9478B9743")}
                color="#fff"
                alignLeft
              />
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
              Outgoing
            </Td>
            <Td textAlign="center" fontSize="sm">
              2.04
            </Td>
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              03.02.2023
            </Td>
            <Td textAlign="center" fontSize="sm" fontWeight="bold">
              03.02.2023
            </Td>
          </Tr>
        ))}
    </>
  );
}

export default ListEscrows;
