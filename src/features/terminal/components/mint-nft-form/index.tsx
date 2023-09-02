import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import TextSwitchSpaced from "@/components/text-switch-spaced";
import GalleryIcon from "@/icons/gallery";
import { Box, Flex, Grid, GridItem, HStack, Spacer, Square, Text } from "@chakra-ui/react";
import AttributeRow from "./attribute-row";
import Button from "@/components/button";
import PlusMinus from "@/components/plus-minus";

function MintNftForm() {
  return (
    <Box pr={2} pb="150px" pos="relative">
      <ItemLabel title="NFT name" />
      <Flex gap="10px" mb={5}>
        <Input w="100%" />
        <Square size="40px" bg="secondary" borderRadius="5px" cursor="pointer">
          <GalleryIcon />
        </Square>
      </Flex>

      <MotionBox pos="relative" h="65px" mb={10}>
        <Box pos="absolute" bottom={0} w="100%">
          <ItemLabel title="Taxon" />
          <Input w="100%" />
        </Box>
      </MotionBox>

      <TextSwitchSpaced title="Transferrable" />
      <TextSwitchSpaced title="Only XRP" />
      <TextSwitchSpaced title="Issuer burn" />

      <Box bg="darkest" borderRadius="20px" px={3} py={1} mb={2}>
        <ItemLabel title="Attributes" mb={0} />
      </Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        <GridItem colSpan={4}>
          <ItemLabel title="key" mb={0} />
        </GridItem>
        <GridItem colSpan={6}>
          <ItemLabel title="Value" mb={0} />
        </GridItem>
        <GridItem colSpan={2} />
        <AttributeRow />
        <AttributeRow />
      </Grid>

      <Box pos="absolute" bottom="0" w="100%" bg="darkest" borderRadius="20px" p={3}>
        <HStack mb={5}>
          <ItemLabel title="Transaction Fee" mb={0} />
          <Spacer />
          <PlusMinus />
          <Text fontSize="sm" fontWeight="bold">
            %
          </Text>
        </HStack>
        <Button w="100%">confirm</Button>
      </Box>
    </Box>
  );
}

export default MintNftForm;
