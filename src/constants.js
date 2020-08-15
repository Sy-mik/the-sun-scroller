import { isMobile } from "react-device-detect";

export const constants = {
  defaultParagraphWidth: isMobile ? "20em" : "30em",
  defaultWrapTextWidth: isMobile ? 300 : 370,
  defaultWrapHeaderWidth: isMobile ? 300 : 700,
  smallerFontSize: isMobile ? 17 : 20,
  //   defaultMobileParagraphWidth: "10em",
};
