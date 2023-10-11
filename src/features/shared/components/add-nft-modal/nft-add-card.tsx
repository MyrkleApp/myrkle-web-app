import { Box, Flex, HStack, Image, Square, Text } from "@chakra-ui/react";
import Button from "@/components/button";
import TrashIcon from "@/icons/trash";

export interface NftAddCardProps {
  name: string;
  image: string;
  handleReload: () => void;
  handleReset: () => void;
}

function NftAddCard({ name, image, handleReload, handleReset }: NftAddCardProps) {
  return (
    <Box display="flex" bg="secondary" p={2} borderRadius="10px" w="100%" h="100%" gap={2}>
      <Image src={image} alt="" w="60%" borderRadius="10px" />

      <Flex w="40%" direction="column" justify="flex-end">
        <Text fontSize="2xs" color="#fff" mb={1} pl={1}>
          Name
        </Text>
        <Text fontSize="sm" color="#fff" fontWeight="bold" pl={1}>
          {name}
        </Text>
        <HStack mt={1} pt={3} borderTop="1px solid #fff">
          <Button h="28px" borderRadius="7px" fontSize="xs" onClick={handleReload}>
            reload
          </Button>
          <Square size="25px" bg="gray" borderRadius="5px" cursor="pointer" onClick={handleReset}>
            <TrashIcon fill="none" fontSize="xs" />
          </Square>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NftAddCard;
