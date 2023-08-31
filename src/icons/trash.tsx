import { Icon } from "@chakra-ui/react";

const TrashIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 23 22" {...props}>
    <path
      d="M4.42969 4.66016H17.9497V19.4102C17.9497 19.8212 17.7864 20.2155 17.4957 20.5062C17.205 20.7968 16.8107 20.9601 16.3997 20.9601H5.97968C5.56859 20.9601 5.17435 20.7968 4.88367 20.5062C4.59299 20.2155 4.42969 19.8212 4.42969 19.4102V4.66016Z"
      stroke="white"
      stroke-width="2"
    />
    <path d="M0 4.66992H22.63" stroke="white" stroke-width="2" />
    <path d="M14.2202 1H8.41016V4.67H14.2202V1Z" stroke="white" stroke-width="2" />
    <path d="M8.82031 16.4602V8.99023" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M13.6211 16.4602V8.99023" stroke="white" stroke-width="2" stroke-linecap="round" />
  </Icon>
);

export default TrashIcon;
