import Skeleton1 from "@/components/skeleton";
import { Text } from "@chakra-ui/react";

export interface RenderAddressBookProps {
  isLoading: boolean;
  isEmpty: boolean;
  children: React.ReactNode;
}

function RenderAddressBook({ isLoading, isEmpty, children }: RenderAddressBookProps) {
  if (isLoading) {
    return (
      <>
        {Array(7)
          .fill(null)
          .map((_: any, i: number) => (
            <Skeleton1 key={i} borderRadius="0" mb={3} h="50px" />
          ))}
      </>
    );
  }

  if (isEmpty) {
    return (
      <Text fontSize="sm" mt={5}>
        We could not find any addresses in your address book.
      </Text>
    );
  }

  return <>{children}</>;
}

export default RenderAddressBook;
