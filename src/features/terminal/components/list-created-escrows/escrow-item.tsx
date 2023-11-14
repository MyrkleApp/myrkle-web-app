import ShowDetailsOnHover from "@/components/show-details-on-hover";
import { ellipsisAtCenter, formatNumber } from "@/helpers";
import { Td, Tr } from "@chakra-ui/react";

export interface EscrowItemProps {
  escrow: any;
  type: "Outgoing" | "Incoming";
}

function EscrowItem({ escrow, type }: EscrowItemProps) {
  return (
    <Tr bg="#333333">
      <Td textAlign="center" fontSize="sm" fontWeight="bold">
        <ShowDetailsOnHover
          fullText={escrow?.prev_txn_id}
          shortText={ellipsisAtCenter(escrow?.prev_txn_id)}
          color="#fff"
          alignLeft
        />
      </Td>
      <Td>
        <ShowDetailsOnHover
          fullText={escrow?.sender}
          shortText={ellipsisAtCenter(escrow?.sender)}
          color="danger"
        />
      </Td>
      <Td>
        <ShowDetailsOnHover
          fullText={escrow?.receiver}
          shortText={ellipsisAtCenter(escrow?.receiver)}
          color="primary"
        />
      </Td>
      <Td textAlign="center" fontSize="sm">
        {type}
      </Td>
      <Td textAlign="center" fontSize="sm">
        {formatNumber(escrow?.amount)}
      </Td>
      <Td textAlign="center" fontSize="sm" fontWeight="bold">
        {escrow?.redeem_date.split(" ")[0]}
      </Td>
      <Td textAlign="center" fontSize="sm" fontWeight="bold">
        {escrow?.expiry_date.split(" ")[0]}
      </Td>
    </Tr>
  );
}

export default EscrowItem;
