import { MotionBox } from "@/components/motion-elements";
import PlusIcon from "@/icons/plus";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";
import FlagIcon from "@/icons/flag";
import RemoveAccountIcon from "@/icons/remove-account";
import { TAccountInfoModal } from "../../types";
import Editables from "./editables";
import Skeleton1 from "@/components/skeleton";
import { useSelector } from "react-redux";
import { selectAddress, selectNet, selectWalletProvider } from "../../redux/wallet.selectors";
import { useGetAccountInfoQuery, useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import ROUTES from "@/routes";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "@/helpers";
import RenderElement from "@/components/render-element";

export interface AccountInfoModalProps {
  handleClose: () => void;
  handleAccountInfoModal: (modal: TAccountInfoModal) => void;
}

function AccountInfoModal({ handleClose, handleAccountInfoModal }: AccountInfoModalProps) {
  const navigate = useNavigate();

  const net = useSelector(selectNet);
  const address = useSelector(selectAddress);
  const walletProvider = useSelector(selectWalletProvider);

  const { data, isLoading } = useGetAccountInfoQuery({ address, net });
  const { isLoading: isXrpBalanceLoading, data: xrpBalance } = useGetBalanceQuery({ address, net });

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleSecretsClick = () => {
    if (walletProvider !== "myrkle") return;

    handleAccountInfoModal("enter-password");
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="470px"
      w="820px"
      p={8}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="space-between" mb="7%">
        <HStack>
          <Text fontWeight="bold" fontSize="2xl">
            Account Info
          </Text>
          <HStack
            bg="dark"
            boxShadow="0 2px 3px #121312"
            py={1}
            px={2}
            borderRadius="5px"
            opacity={walletProvider === "myrkle" ? 1 : 0.4}
            cursor={walletProvider === "myrkle" ? "pointer" : "not-allowed"}
          >
            <PlusIcon fontSize="2xs" />
            <Text fontWeight="bold" fontSize="xs">
              add account
            </Text>
          </HStack>
        </HStack>
        <CloseButton onClick={handleClose} />
      </Flex>
      <HStack
        bg="dark"
        opacity={walletProvider === "myrkle" ? 1 : 0.4}
        boxShadow="0 2px 3px #121312"
        py={1}
        px={2}
        borderRadius="5px"
        pos="absolute"
        right={8}
        top="85px"
        cursor={walletProvider === "myrkle" ? "pointer" : "not-allowed"}
        onClick={handleSecretsClick}
      >
        <Text fontWeight="bold" fontSize="xs">
          secrets
        </Text>
      </HStack>

      <RenderAccountInfo isLoading={isLoading}>
        <SimpleGrid columns={2} h="300px" spacing="10px">
          <Flex direction="column" justify="space-between" border="1px solid transparent">
            <Box>
              <HStack>
                <Text fontWeight="bold" fontSize="sm">
                  Index
                </Text>
                {/* info popup here */}
              </HStack>
            </Box>

            <Box bg="dark" borderRadius="12px" p={4} boxShadow="0 2px 8px #00000040">
              <Text fontWeight="bold" fontSize="sm">
                {data?.index}
              </Text>
            </Box>

            <HStack spacing="10px">
              <RenderElement isLoading={isXrpBalanceLoading} h="77px">
                <HStack
                  bg="dark"
                  borderRadius="12px"
                  p={4}
                  w="100%"
                  boxShadow="0 2px 8px #00000040"
                >
                  <Image src={xrpLogo} alt="logo" />
                  <VStack align="flex-start" spacing="0">
                    <Text fontWeight="bold" fontSize="2xl">
                      {formatNumber(xrpBalance?.balance)}
                    </Text>
                    <HStack mt="-5px">
                      <Text fontSize="2xs">Balance</Text>
                      {/* info popup here */}
                    </HStack>
                  </VStack>
                </HStack>
              </RenderElement>

              {/* <VStack
                align="flex-start"
                bg="dark"
                borderRadius="12px"
                p={4}
                pl={4}
                w="40%"
                spacing="0"
                boxShadow="0 2px 8px #00000040"
              >
                <Text fontWeight="bold" fontSize="2xl">
                  $1,506.00
                </Text>
                <HStack mt="-5px">
                  <Text fontSize="2xs">Spendable balance</Text>
                </HStack>
              </VStack> */}
            </HStack>

            <SimpleGrid columns={4} h="90px" spacing={2}>
              <VStack
                bg="dark"
                borderRadius="12px"
                pt={4}
                spacing={4}
                boxShadow="0 2px 8px #00000040"
              >
                <Text fontSize="2xl">{data?.account_objects}</Text>
                <Text fontSize="2xs" mt={-1.5}>
                  Object Count
                </Text>
              </VStack>

              <VStack
                bg="dark"
                borderRadius="12px"
                pt={4}
                spacing={4}
                boxShadow="0 2px 8px #00000040"
              >
                <Text fontSize="2xl">{data?.tick_size}</Text>
                <Text fontSize="2xs" mt={-1.5}>
                  Tick size
                </Text>
              </VStack>

              <VStack
                bg="dark"
                borderRadius="12px"
                pt={4}
                spacing="12px"
                boxShadow="0 2px 8px #00000040"
                cursor="pointer"
                onClick={() => navigate(ROUTES.TERMINAL_FLAGS)}
              >
                <FlagIcon fontSize="2xl" />
                <Text fontSize="2xs" textAlign="center" maxW="70%" lineHeight={1.1}>
                  Account Root Flags
                </Text>
              </VStack>

              <VStack
                bg="#FF00008C"
                borderRadius="12px"
                pt={4}
                spacing="12px"
                boxShadow="0 2px 8px #00000040"
                opacity={walletProvider === "myrkle" ? 1 : 0.4}
                cursor={walletProvider === "myrkle" ? "pointer" : "not-allowed"}
              >
                <RemoveAccountIcon fontSize="2xl" mb={0} />
                <Text fontSize="2xs" textAlign="center" maxW="70%" lineHeight={1.1}>
                  Delete Account
                </Text>
              </VStack>
            </SimpleGrid>
          </Flex>

          <Box bg="dark" borderRadius="12px" boxShadow="0 2px 8px #00000040" pos="relative">
            <Box
              bg="#5757573B"
              h="calc(100% - 20px)"
              w="60%"
              borderRadius="12px"
              pos="absolute"
              top="10px"
              right="10px"
              zIndex={-1}
            />
            <Editables data={data} />
          </Box>
        </SimpleGrid>
      </RenderAccountInfo>
    </MotionBox>
  );
}

const RenderAccountInfo = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <SimpleGrid columns={2} h="300px" spacing="10px">
        <Flex h="100%" direction="column" justify="space-between">
          <Skeleton1 h="23%" borderRadius="0" />
          <Skeleton1 h="23%" borderRadius="0" />
          <Skeleton1 h="23%" borderRadius="0" />
          <Skeleton1 h="23%" borderRadius="0" />
        </Flex>

        <Skeleton1 h="100%" borderRadius="0" />
      </SimpleGrid>
    );
  }

  return <>{children}</>;
};

export default AccountInfoModal;
