import { HStack, Image, Text } from "@chakra-ui/react";

export interface IssuerDataProps {
  issuerName: string;
  issuerIcon: string;
  imageProps?: any;
  textProps?: any;
  [anyProp: string]: any;
}

function IssuerData({ issuerName, issuerIcon, imageProps, textProps, ...props }: IssuerDataProps) {
  return (
    <HStack {...props}>
      <Image src={issuerIcon} {...imageProps} />
      <Text fontSize="xs" {...textProps}>
        {issuerName}
      </Text>
    </HStack>
  );
}

export default IssuerData;
