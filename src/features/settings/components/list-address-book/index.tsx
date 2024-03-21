// import Skeleton1 from "@/components/skeleton";
// import { useLazyGetAddressBookQuery } from "@/features/shared/redux/xrp.api";
import { Text } from "@chakra-ui/react";
import AddressBookItem from "./address-book-item";
import { useSelector } from "react-redux";
// import { selectUserToken } from "@/features/auth/redux/auth.selectors";
// import { useEffect } from "react";
import { selectAddressBookList } from "@/features/wallet/redux/wallet.selectors";

function ListAddressBook() {
  const addressBookList = useSelector(selectAddressBookList);

  // const userToken = useSelector(selectUserToken);

  // const [getAddressBook, { data, isLoading, isFetching }] = useLazyGetAddressBookQuery();

  // useEffect(() => {
  //   if (userToken) {
  //     getAddressBook({}, true);
  //   }
  // }, [getAddressBook, userToken]);

  // if (isLoading || isFetching) {
  //   return (
  //     <>
  //       {Array(4)
  //         .fill(null)
  //         .map((_, i) => (
  //           <Skeleton1 key={i} h="55px" mb={3} borderRadius={0} />
  //         ))}
  //     </>
  //   );
  // }

  if (!addressBookList.length) {
    return <Text fontSize="sm">We could not find any addresses in your address book.</Text>;
  }

  return (
    <>
      {addressBookList.map((addressItem: any) => (
        <AddressBookItem
          key={addressItem.id}
          // id={addressItem.id}
          name={addressItem.name}
          address={addressItem.address}
        />
      ))}
    </>
  );
}

export default ListAddressBook;
