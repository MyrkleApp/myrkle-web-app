import { Icon } from "@chakra-ui/react";

const ChecksIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 122 95" {...props}>
    <path d="M10 10H112" stroke={props.color} stroke-width="20" stroke-linecap="round" />
    <path d="M10 48H112" stroke={props.color} stroke-width="20" stroke-linecap="round" />
    <path d="M10 85H61" stroke={props.color} stroke-width="20" stroke-linecap="round" />
  </Icon>
);

export default ChecksIcon;
