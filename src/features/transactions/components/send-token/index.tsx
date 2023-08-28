import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import AddressBookIcon from "@/icons/address-book";
import QrCodeIcon from "@/icons/qr-code";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { Flex, Grid, GridItem, HStack, Square, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AssetsDropdown from "../assets-dropdown";

function SendToken() {
  const [isAdvancedOptions, setAdvancedOptions] = useState(false);

  const toggleAdvancedOptions = () => {
    if (isAdvancedOptions) setAdvancedOptions(false);
    else setAdvancedOptions(true);
  };

  return (
    <>
      <Text color="textDark" fontWeight="bold" pos="absolute" top="13%">
        Name
      </Text>
      <Flex
        h="9%"
        justify="space-between"
        align="center"
        p="5px"
        bg="secondary"
        borderRadius="7px"
        pos="absolute"
        top="20%"
        w="100%"
      >
        <Box h="100%" pos="relative">
          <AssetsDropdown />
        </Box>
        <Input w="50%" h="100%" textAlign="right" />
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

      <MotionBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        pos="absolute"
        w="100%"
        initial={{ top: "70%" }}
        animate={{
          top: isAdvancedOptions ? "66%" : "70%",
          transition: { type: "spring", stiffness: 150 },
        }}
      >
        <HStack cursor="pointer" onClick={toggleAdvancedOptions}>
          <ThickArrowDownIcon color="#fff" />
          <Text color="#fff" fontWeight="bold">
            Advanced options
          </Text>
        </HStack>
      </MotionBox>

      <AnimatePresence>
        {isAdvancedOptions && (
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SimpleGrid columns={2} h="9%" pos="absolute" top="72%" spacing={3}>
              <Box>
                <Text color="textDark" fontSize="sm" fontWeight="bold">
                  Note
                </Text>
                <Input h="85%" bg="secondary" borderRadius="7px" w="100%" />
              </Box>
              <Box>
                <Text color="textDark" fontSize="sm" fontWeight="bold">
                  Destination Tag
                </Text>
                <Input h="85%" bg="secondary" borderRadius="7px" w="100%" />
              </Box>
            </SimpleGrid>
          </MotionBox>
        )}
      </AnimatePresence>

      <MotionBox
        pos="absolute"
        w="100%"
        h="9%"
        initial={{ bottom: "7%" }}
        animate={{
          bottom: isAdvancedOptions ? 0 : "7%",
          transition: { type: "spring", stiffness: 150 },
        }}
      >
        <Button bg="secondary" w="100%" h="100%">
          confirm
        </Button>
      </MotionBox>
    </>
  );
}

export default SendToken;
