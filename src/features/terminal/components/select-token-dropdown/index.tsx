import { MotionBox, MotionText } from "@/components/motion-elements";
import { Box, HStack, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import TokenItem from "./token-item";
import { useGetAccountTokensQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import Skeleton1 from "@/components/skeleton";
import { xrpToken } from "@/constants";

export interface SelectTokenDropdownProps {
  handleTokenClick: (token: any) => void;
  isTokenDisabled?: boolean;
}

function SelectTokenDropdown({ handleTokenClick, isTokenDisabled }: SelectTokenDropdownProps) {
  const net = useSelector(selectNet);
  const address = useSelector(selectAddress);

  const { data, isLoading } = useGetAccountTokensQuery({ net, address });

  const { isOpen, onToggle } = useDisclosure();

  const handleToken = (token: any) => {
    if (isTokenDisabled) return;
    handleTokenClick(token);
  };

  return (
    <MotionBox
      h="60px"
      maxH="350px"
      bg="secondary"
      borderRadius="15px"
      cursor="pointer"
      onClick={onToggle}
      animate={{ height: isOpen ? "auto" : 60 }}
      exit={{ opacity: 0 }}
    >
      <HStack h="60px">
        <MotionText fontSize="xs" px={8} animate={{ fontSize: isOpen ? "9px" : "12px" }}>
          Select Token
        </MotionText>
      </HStack>
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            px={2}
            pb={8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box maxH="270px" overflow="auto" pr={1}>
              <RenderTokenList isLoading={isLoading}>
                <TokenItem token={xrpToken} handleClick={() => handleTokenClick(xrpToken)} />
                {data?.map((token: any, i: number) => (
                  <TokenItem
                    key={i}
                    token={token}
                    handleClick={() => handleToken(token)}
                    isDisabled={isTokenDisabled}
                  />
                ))}
              </RenderTokenList>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

const RenderTokenList = ({ isLoading, children }: any) => {
  if (isLoading) {
    return (
      <>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} w="auto" h="50px" mb={2} borderRadius="0" />
          ))}
      </>
    );
  }

  return <>{children}</>;
};

export default SelectTokenDropdown;
