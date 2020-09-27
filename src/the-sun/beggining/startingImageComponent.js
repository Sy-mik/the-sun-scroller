import React from "react";
import { isMobile } from "react-device-detect";

export default function StartingImageComponent({
  innerWidth,
  innerHeight,
  zoom,
  sunImageOpacity,
  sunImage,
}) {
  return (
    <div
      style={{
        position: "sticky",
        width: "100%",
        // left:'50%',
        top: isMobile ? "85%" : "75%",
        display: "flex",
        transform: `translate(0px, ${zoom}px)`,
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt="image of the sun"
        style={{
          zIndex: 99,
          maxWidth: innerHeight, // '100%',
          maxHeight: innerWidth,
          marginLeft: "auto",
          marginRight: "auto",
          // transform: `translate(0px, ${zoom}px)`,
          opacity: sunImageOpacity,
        }
      }
        src={sunImage}
      ></img>
    </div>
  );
}
