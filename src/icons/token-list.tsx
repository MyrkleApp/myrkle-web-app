import { Icon } from "@chakra-ui/react";

const TokenListIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 22 22" {...props}>
    <path
      d="M20.9926 12.2227V17.5513C20.9926 17.5513 19.0662 20.5528 11 20.5528C2.93382 20.5528 1 17.5513 1 17.5513L1 12.2227"
      stroke={props.color || "#F2F2F2"}
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M11 9.63235C16.5228 9.63235 21 7.69993 21 5.31618C21 2.93242 16.5228 1 11 1C5.47715 1 1 2.93242 1 5.31618C1 7.69993 5.47715 9.63235 11 9.63235Z"
      stroke={props.color || "#F2F2F2"}
      stroke-width="2"
      stroke-miterlimit="10"
    />
    <path
      d="M20.9926 5.67285V12.0015C20.9926 12.0015 19.0662 15.003 11 15.003C2.93382 15.003 1 12.0015 1 12.0015L1 5.67285"
      stroke={props.color || "#F2F2F2"}
      stroke-width="2"
      stroke-miterlimit="10"
    />
  </Icon>
);

export default TokenListIcon;
