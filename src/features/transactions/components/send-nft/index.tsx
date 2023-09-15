import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import PlusIcon from "@/icons/plus";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import SelectNftModal from "./select-nft-modal";
import { useState } from "react";
import SelectedNft from "./selected-nft";

// TODO: REMOVE DIRTY PROP-DRILLING !!!

function SendNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNftSelected, setIsNftSelected] = useState(false);

  const handleNftItemClick = () => {
    setIsNftSelected(true);
  };

  if (isNftSelected) {
    return <SelectedNft />;
  }

  return (
    <>
      <Flex
        w="60%"
        aspectRatio={1 / 0.9}
        bg="secondary"
        borderRadius="10px"
        direction="column"
        justify="center"
        align="center"
        pos="absolute"
        ml="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        cursor="pointer"
        onClick={onOpen}
      >
        <PlusIcon fontSize="60px" color="gray" />
        <Text fontSize="2xs" color="gray" mt={2}>
          Click to select NFT
        </Text>
      </Flex>

      <Button
        pos="absolute"
        bottom="0"
        ml="50%"
        transform="translateX(-50%)"
        bg="secondary"
        letterSpacing={1}
        w="60%"
      >
        confirm
      </Button>

      <Backdrop isOpen={isOpen}>
        <SelectNftModal handleClose={onClose} handleNftItemClick={handleNftItemClick} />
      </Backdrop>
    </>
  );
}

export default SendNft;
