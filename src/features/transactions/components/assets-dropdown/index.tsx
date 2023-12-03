import { MotionBox } from "@/components/motion-elements";
import { HStack, Spacer, Spinner, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import DropdownItem from "./dropdown-item";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useGetAccountTokensQuery, useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { IToken } from "@/features/shared/types";
import { xrpIssuer } from "@/constants";
import TokenIcon from "@/features/shared/components/token-icon";

export interface AssetsDropdownProps {
  selectedToken: Omit<IToken, "icon">;
  handleSelectedToken: (token: Omit<IToken, "icon">) => void;
}

function AssetsDropdown({ selectedToken, handleSelectedToken }: AssetsDropdownProps) {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { isLoading, data } = useGetAccountTokensQuery({ address, net });
  const { data: xrpBalance } = useGetBalanceQuery({ address, net });

  const { isOpen, onToggle, onClose } = useDisclosure();

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: onClose,
  });

  return (
    <>
      <HStack
        ref={ref}
        h="100%"
        w="130px"
        px={2}
        pos="absolute"
        top="0"
        bg="#4F4F4F"
        cursor={isLoading ? "not-allowed" : "pointer"}
        zIndex={2}
        borderRadius={isOpen ? "5px 5px 0 0" : "5px"}
        onClick={() => !isLoading && onToggle()}
      >
        <TokenIcon token={selectedToken.token} issuer={selectedToken.issuer} h="20px" />
        <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
          {selectedToken.token}
        </Text>

        <Spacer />

        {isLoading ? <Spinner size="sm" /> : <ThickArrowDownIcon fontSize="2xs" color="#b4b4b4" />}
      </HStack>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            px={2}
            pt={1}
            w="130px"
            maxH="250px"
            bg="#4F4F4F"
            borderRadius={isOpen ? "0 0 5px 5px" : "5px"}
            pos="absolute"
            top="100%"
            cursor="pointer"
            overflow="hidden auto"
            zIndex={1}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            <DropdownItem
              token="xrp"
              issuer={xrpIssuer}
              handleClick={() =>
                handleSelectedToken({
                  token: "xrp",
                  issuer: xrpIssuer,
                  balance: xrpBalance?.balance,
                })
              }
            />
            {data?.map(({ token, issuer, amount }: any, i: number) => (
              <DropdownItem
                key={i}
                token={token}
                issuer={issuer}
                handleClick={() =>
                  handleSelectedToken({
                    token,
                    issuer,
                    balance: amount,
                  })
                }
              />
            ))}
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}

export default AssetsDropdown;
