import { Icon } from "@chakra-ui/react";

const PlusIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 76 81" {...props}>
    <path d="M38 4L38 77" stroke={props.color || "#fff"} stroke-width="8" stroke-linecap="round" />
    <path d="M72 40L4 40" stroke={props.color || "#fff"} stroke-width="8" stroke-linecap="round" />
  </Icon>
);

export default PlusIcon;
