import { MotionBox } from "@/components/motion-elements";
import { HStack, InputGroup, Box, Text, useOutsideClick, InputLeftElement } from "@chakra-ui/react";
import Input from "@/components/input";
import { useRef } from "react";
import ArrowLeftIcon from "@/icons/arrow-left";
import SearchIcon from "@/icons/search";
import TokenItem from "./token-item";
import { useGetMainnetTokensQuery } from "../../redux/token.api";
import Skeleton1 from "@/components/skeleton";

export interface SelectTokenModalProps {
  handleClose: () => void;
  handleBackArrowClick?: () => void;
  handleToken: (token: any) => void;
}

function SelectTokenModal({
  handleClose,
  handleBackArrowClick,
  handleToken,
}: SelectTokenModalProps) {
  const { data, isLoading } = useGetMainnetTokensQuery({});

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
      maxH="90%"
      h="500px"
      w="350px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack spacing={5} pl={3} pt={2} mb={8}>
        {handleBackArrowClick && <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />}
        <Text fontSize="sm" fontWeight="bold">
          Select Token
        </Text>
      </HStack>

      <InputGroup>
        <Input
          mb={3}
          pl={10}
          borderRadius="30px"
          placeholder="Search name or paste address"
          fontSize="sm"
          border="2px solid"
          borderColor="success"
          bg="rgba(0, 223, 22, 0.27)"
          color="#fff"
          _hover={{ borderColor: "success" }}
        />
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>

      <Box px={4} mt={1} h="calc(100% - 140px)" overflow="hidden auto">
        <RenderTokenList isLoading={isLoading}>
          {data?.map((token, i) => (
            <TokenItem
              key={i}
              token={token.token}
              issuer={token.issuer}
              icon={token.icon}
              handleClick={() => handleToken(token)}
            />
          ))}
        </RenderTokenList>
      </Box>
    </MotionBox>
  );
}

const RenderTokenList = ({ isLoading, children }: any) => {
  if (isLoading) {
    return (
      <>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="50px" borderRadius="0" mb={3} />
          ))}
      </>
    );
  }

  return <>{children}</>;
};

export default SelectTokenModal;
