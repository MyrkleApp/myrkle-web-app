import LogoIcon from "@/icons/logo";
import { Spinner, VStack } from "@chakra-ui/react";

function MyrkleLoader() {
  return (
    <VStack pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
      <Spinner />
      <LogoIcon fontSize="120px" mt={-10} />
    </VStack>
  );
}

export default MyrkleLoader;
