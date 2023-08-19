import { Icon } from "@chakra-ui/react";

const FlagIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 96 112" {...props}>
    <path d="M5 5V107" stroke="#686868" stroke-width="10" stroke-linecap="round" />
    <path
      d="M22 13V61H81L22 13Z"
      fill="#686868"
      stroke="#686868"
      stroke-width="10"
      stroke-linecap="round"
    />
  </Icon>
);

export default FlagIcon;
