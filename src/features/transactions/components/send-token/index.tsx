import Button from "@/components/button";
import Input from "@/components/input";
import AddressBookIcon from "@/icons/address-book";
import QrCodeIcon from "@/icons/qr-code";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { Flex, Grid, GridItem, HStack, Square, SimpleGrid, Text, Box } from "@chakra-ui/react";

function SendToken() {
  return (
    <>
      <Text color="textDark" fontWeight="bold" pos="absolute" top="13%">
        Name
      </Text>
      <Flex h="9%" bg="secondary" borderRadius="7px" pos="absolute" top="20%" w="100%">
        content
      </Flex>

      <Text color="textDark" fontWeight="bold" pos="absolute" top="34%">
        Recipient Address or ANS Name
      </Text>
      <Input h="9%" bg="secondary" borderRadius="7px" pos="absolute" top="41%" w="100%" />

      <Grid templateColumns="repeat(12, 1fr)" pos="absolute" top="55%">
        <GridItem colSpan={5}>
          <HStack>
            <Square bg="secondary" size="50px" borderRadius="10px">
              <QrCodeIcon fontSize="2xl" />
            </Square>
            <Text color="textDark" fontSize="sm" fontWeight="bold">
              Scan code
            </Text>
          </HStack>
        </GridItem>
        <GridItem colSpan={5}>
          <HStack>
            <Square bg="secondary" size="50px" borderRadius="10px">
              <AddressBookIcon fontSize="2xl" />
            </Square>
            <Text color="textDark" fontSize="sm" fontWeight="bold">
              Address Book
            </Text>
          </HStack>
        </GridItem>
      </Grid>

      <Flex justify="flex-end" align="center" pos="absolute" top="66%" w="100%">
        <HStack cursor="pointer">
          <ThickArrowDownIcon />
          <Text color="#fff" fontWeight="bold">
            Advanced options
          </Text>
        </HStack>
      </Flex>

      <SimpleGrid columns={2} h="9%" pos="absolute" top="72%" spacing={3}>
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Box key={i}>
              <Text color="textDark" fontSize="sm" fontWeight="bold">
                Address Book
              </Text>
              <Input h="90%" bg="secondary" borderRadius="7px" w="100%" />
            </Box>
          ))}
      </SimpleGrid>

      <Button pos="absolute" bottom="0" bg="secondary" w="100%" h="9%">
        confirm
      </Button>
    </>
  );
}

export default SendToken;
