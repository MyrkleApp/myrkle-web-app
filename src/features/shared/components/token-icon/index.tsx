import { isXrpToken } from "@/helpers";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { useLazyGetTokenInfoQuery } from "../../redux/token.api";
import { useEffect } from "react";

export interface TokenIconProps {
  token: string;
  issuer: string;
  [anyProp: string]: any;
}

function TokenIcon({ token, issuer, ...props }: TokenIconProps) {
  const network = useSelector(selectNetwork);

  const [getTokenInfo, { data }] = useLazyGetTokenInfoQuery();

  useEffect(() => {
    if (network === "mainnet" && !isXrpToken({ token })) {
      getTokenInfo({ token, issuer });
    }
  });

  if (isXrpToken({ token })) {
    return <Image src={xrpLogo} alt="" h="30px" {...props} />;
  }

  if (!isXrpToken({ token }) && network !== "mainnet") {
    return <Image src={tokenPlaceholder} alt="" h="30px" {...props} />;
  }

  return <Image src={data?.icon || tokenPlaceholder} alt="" h="30px" {...props} />;
}

export default TokenIcon;
