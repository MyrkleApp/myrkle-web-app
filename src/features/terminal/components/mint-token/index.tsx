import { useState } from "react";
import MintTokenForm from "./mint-token-form";
import Manager from "./manager";
// import { Flex, Text } from "@chakra-ui/react";

function MintToken() {
  const [view] = useState<"form" | "manager">("form");

  // return (
  //   <Flex justify="center" align="center" h="100%">
  //     <Text fontSize="2xl" fontWeight="bold">
  //       UNDER CONTRUCTION
  //     </Text>
  //   </Flex>
  // );

  if (view === "form") return <MintTokenForm />;

  if (view === "manager") return <Manager />;

  return <div></div>;
}

export default MintToken;
