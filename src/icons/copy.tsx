import { Icon } from "@chakra-ui/react";

const CopyIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 12 14" {...props}>
    <path d="M8.5 1.375H1V9.5" stroke="#D3D3D3" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M3.5 3.875H11V11.375C11 11.7065 10.8683 12.0245 10.6339 12.2589C10.3995 12.4933 10.0815 12.625 9.75 12.625H4.75C4.41848 12.625 4.10054 12.4933 3.86612 12.2589C3.6317 12.0245 3.5 11.7065 3.5 11.375V3.875Z"
      stroke="#D3D3D3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
);

export default CopyIcon;
