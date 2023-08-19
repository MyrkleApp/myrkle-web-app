import { Icon } from "@chakra-ui/react";

const AddressBookIcon = ({ ...props }: any) => (
  <Icon viewBox="0 0 34 34" {...props}>
    <rect width="34" height="34" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_1143_27003" transform="scale(0.0111111)" />
      </pattern>
      <image
        id="image0_1143_27003"
        width="90"
        height="90"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </Icon>
);

export default AddressBookIcon;
