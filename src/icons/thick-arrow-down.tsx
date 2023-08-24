import { Icon } from "@chakra-ui/react";

const ThickArrowDownIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 18 14" {...props}>
    <path d="M3 3.5L9 9.5L15 3.5" stroke={props.color} stroke-width="6" stroke-linecap="round" />
  </Icon>
);

export default ThickArrowDownIcon;
