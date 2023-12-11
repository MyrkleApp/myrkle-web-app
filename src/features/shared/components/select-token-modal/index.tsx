import { MotionBox } from "@/components/motion-elements";
import {
  HStack,
  InputGroup,
  Box,
  Text,
  useOutsideClick,
  InputLeftElement,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Input from "@/components/input";
import { useRef, useState } from "react";
import ArrowLeftIcon from "@/icons/arrow-left";
import SearchIcon from "@/icons/search";
import TokenItem from "./token-item";
import { useGetMainnetTokensQuery } from "../../redux/token.api";
import Skeleton1 from "@/components/skeleton";
import { filterTokenList } from "@/helpers";
import { IToken } from "../../types";
import { useDebounce } from "react-use";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useGetAccountTokensQuery } from "../../redux/xrp.api";
// import { useLazyCheckTokenExistsQuery } from "../../redux/xrp.api";

export interface SelectTokenModalProps {
  handleClose: () => void;
  handleBackArrowClick?: () => void;
  handleToken: (token: any) => void;
  showMyTokensOption?: boolean;
}

function SelectTokenModal({
  handleClose,
  handleBackArrowClick,
  handleToken,
  showMyTokensOption,
}: SelectTokenModalProps) {
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [tokenList, setTokenList] = useState<IToken[]>([]);
  const [radioButton, setRadioButton] = useState<"select-token" | "my-tokens">("select-token");

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetMainnetTokensQuery({});
  const { isLoading: isMyTokensLoading, data: myTokensData } = useGetAccountTokensQuery({
    address,
    net,
  });
  // const [checkTokenExists] = useLazyCheckTokenExistsQuery();

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  useDebounce(
    () => {
      if (!searchName.trim().length && !searchAddress.trim().length && data) {
        setTokenList(data);
        return;
      }

      const filteredList = filterTokenList(data || [], searchName, searchAddress);

      if (filteredList.length) {
        setTokenList(filteredList);
        return;
      } else {
        setTokenList([]);
      }

      // continue from here
      setTokenList(filteredList);
    },
    300,
    [searchName, searchAddress, isLoading],
  );

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

        {showMyTokensOption ? (
          <RadioGroup value={radioButton} onChange={(e: any) => setRadioButton(e)}>
            <HStack>
              <Radio size="sm" colorScheme="green" value="select-token">
                Select Token
              </Radio>
              <Radio size="sm" colorScheme="green" value="my-tokens">
                My Tokens
              </Radio>
            </HStack>
          </RadioGroup>
        ) : (
          <Text fontSize="sm" fontWeight="bold">
            Select Token
          </Text>
        )}
      </HStack>

      {radioButton === "select-token" && (
        <HStack>
          <InputGroup>
            <Input
              mb={3}
              pl={10}
              borderRadius="30px"
              placeholder="Search name"
              fontSize="sm"
              border="2px solid"
              borderColor="success"
              bg="rgba(0, 223, 22, 0.27)"
              color="#fff"
              _hover={{ borderColor: "success" }}
              value={searchName}
              onChange={(e: any) => setSearchName(e.target.value)}
            />
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          </InputGroup>
          <InputGroup>
            <Input
              mb={3}
              pl={10}
              borderRadius="30px"
              placeholder="Search address"
              fontSize="sm"
              border="2px solid"
              borderColor="success"
              bg="rgba(0, 223, 22, 0.27)"
              color="#fff"
              _hover={{ borderColor: "success" }}
              value={searchAddress}
              onChange={(e: any) => setSearchAddress(e.target.value)}
            />
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          </InputGroup>
        </HStack>
      )}

      <Box
        px={4}
        mt={1}
        h={`calc(100% - ${radioButton === "select-token" ? 140 : 90}px)`}
        overflow="hidden auto"
      >
        {radioButton === "select-token" && (
          <RenderTokenList isLoading={isLoading}>
            {tokenList.map((token, i) => (
              <TokenItem
                key={i}
                token={token.token}
                issuer={token.issuer}
                icon={token.icon}
                handleClick={() => handleToken(token)}
              />
            ))}
          </RenderTokenList>
        )}

        {radioButton === "my-tokens" && (
          <RenderTokenList isLoading={isMyTokensLoading}>
            {myTokensData?.map((token: any, i: number) => (
              <TokenItem
                key={i}
                token={token.token}
                issuer={token.issuer}
                icon={token.icon}
                isMyToken={true}
                handleClick={() =>
                  handleToken({
                    token: token.token,
                    issuer: token.issuer,
                    icon: token.icon,
                  })
                }
              />
            ))}
          </RenderTokenList>
        )}
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
