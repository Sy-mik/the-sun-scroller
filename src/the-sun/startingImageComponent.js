import React, { useState, useEffect, useRef } from "react";
import SlidingTextWithOpacityParallaxContainer from "./animations/sliding-text-with-opacity-parallax-container";
import SpinningSunContainer from "./spinning-sun-container";
import StartingTextComponent from "./textComponents/startingTextComponent";
import * as d3 from "d3";
import SolarSystemGraph from "./solarSystemGraph";
import { isMobile } from "react-device-detect";
import SuperBigHeaderComponent from "./SuperBigHeaderComponent";

export default function StartingImageComponent({
  scrollPosition,
  height,
  innerWidth,
  innerHeight,
  zoom,
  solarSystemGraphOpacity,
  sunImage,
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        top: "80%",
        display: "flex",
        // alignContent: "center",
        // alignItems: "center",
      }}
    >
      <img
        style={{
          zIndex: 99,
          maxWidth: innerHeight, // '100%',
          maxHeight: innerWidth,
          marginLeft: "auto",
          marginRight: "auto",
          transform: `scale(${zoom})`,
          opacity: 1 - solarSystemGraphOpacity,
        }}
        src={sunImage}
      ></img>
    </div>
  );
}
