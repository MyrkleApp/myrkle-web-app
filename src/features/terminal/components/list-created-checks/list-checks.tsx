import CheckItem from "./check-item";

export interface ListChecksProps {
  sent: any[];
  received: any[];
}

function ListChecks({ sent, received }: ListChecksProps) {
  return (
    <>
      {sent?.map((check: any) => <CheckItem key={check.check_id} check={check} />)}
      {received?.map((check: any) => <CheckItem key={check.check_id} check={check} />)}
    </>
  );
}

export default ListChecks;
