import { isMobile } from "react-device-detect";

export const constants = {
  defaultParagraphWidth: isMobile ? "20em" : "30em",
  defaultWrapTextWidth: isMobile ? 230 : 370,
  defaultWrapHeaderWidth: isMobile ? 230 : 370,

  //   defaultMobileParagraphWidth: "10em",
};
