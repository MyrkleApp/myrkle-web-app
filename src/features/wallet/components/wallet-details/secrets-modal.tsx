import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, HStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ShowSecretNumbers from "./show-secret-numbers";
import ShowMnemonic from "./show-mnemonic";
import Button from "@/components/button";

export interface SecretsModalProps {
  handleClose: () => void;
}

type TSecretType =
  | "seed"
  | "secret-numbers"
  | "mnemonic"
  | "private-key"
  | "public-key"
  | "address";

interface ISecretType {
  name: string;
  type: TSecretType;
}

const secretTypes: ISecretType[] = [
  { name: "Seed", type: "seed" },
  { name: "Secret Numbers", type: "secret-numbers" },
  { name: "Mnemonic", type: "mnemonic" },
  { name: "Private Key", type: "private-key" },
  { name: "Public Key", type: "public-key" },
  { name: "Address", type: "address" },
];

function SecretsModal({ handleClose }: SecretsModalProps) {
  const [secretType, setSecretType] = useState<TSecretType>("seed");

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="350px"
      w="450px"
      p={4}
      bg="darker"
      borderRadius="25px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="space-between" pl={4} mb={4}>
        <Text fontSize="sm" fontWeight="bold">
          Secrets
        </Text>
        <CloseButton size="sm" onClick={handleClose} />
      </Flex>

      <Flex h="calc(100% - 50px)" gap={2}>
        <Flex direction="column" justify="space-between" w="35%">
          {secretTypes.map((secret, i) => (
            <Flex
              key={i}
              align="center"
              px="10px"
              bg={secret.type === secretType ? "#00DF165C" : "transparent"}
              borderRadius="5px"
              h="35px"
              cursor="pointer"
              onClick={() => setSecretType(secret.type)}
            >
              <Text fontSize="xs" fontWeight="bold">
                {secret.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Box w="65%" borderRadius="10px" bg="#333333" py={3} px={4} pos="relative">
          {secretType === "seed" && (
            <Text mt={0} fontSize="sm" letterSpacing={1} color="textDark" fontWeight="bold">
              sp1MM2a8G6i5mn2NpzwKTjDDfu6X5
            </Text>
          )}

          {secretType === "secret-numbers" && <ShowSecretNumbers />}

          {secretType === "mnemonic" && <ShowMnemonic />}

          {secretType === "private-key" && (
            <Text mt={0} fontSize="sm" letterSpacing={1} color="textDark" fontWeight="bold">
              sp1MM2a8G6i5mn2NpzwKTjDDfu6X5sp1MM2a8G6i5mn2NpzwKTjDDfu6X5sp1MM2a8G6i5mn2NpzwKTjDDfu6X5
            </Text>
          )}

          {secretType === "public-key" && (
            <Text mt={0} fontSize="sm" letterSpacing={1} color="textDark" fontWeight="bold">
              sp1MM2a8G6i5mn2NpzwKTjDDfu6X5sp1MM2a8G6i5mn2NpzwKTjDDfu6X5sp1MM2a8G6i5mn2NpzwKTjDDfu6X5
            </Text>
          )}

          {secretType === "address" && (
            <Text mt={0} fontSize="sm" letterSpacing={1} color="textDark" fontWeight="bold">
              sp1MM2a8G6i5mn2NpzwKTjDDfu6X5
            </Text>
          )}

          <HStack pos="absolute" bottom={3} right={3}>
            <Button w="100px" h="30px">
              copy
            </Button>
          </HStack>
        </Box>
      </Flex>
    </MotionBox>
  );
}

export default SecretsModal;
