import EscrowItem from "./escrow-item";

export interface ListEscrowsProps {
  sent: any[];
  received: any[];
}

function ListEscrows({ sent, received }: ListEscrowsProps) {
  return (
    <>
      {sent?.map((escrow: any) => (
        <EscrowItem key={escrow.escrow_id} escrow={escrow} type="Outgoing" />
      ))}
      {received?.map((escrow: any) => (
        <EscrowItem key={escrow.escrow_id} escrow={escrow} type="Incoming" />
      ))}
    </>
  );
}

export default ListEscrows;
