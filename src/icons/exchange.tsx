import { Icon } from "@chakra-ui/react";

const ExchangeIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 19 19" {...props}>
    <path d="M3 6H14L9.28571 2" stroke={props.color} stroke-width="3" />
    <path d="M16 13H5L9.71429 17" stroke={props.color} stroke-width="3" />
  </Icon>
);

export default ExchangeIcon;
