import React, { useState, useEffect, useRef } from "react";
import SlidingTextWithOpacityParallaxContainer from "../animations/sliding-text-with-opacity-parallax-container";
import SpinningSunContainer from "../spinningSun/spinning-sun-container";
import StartingTextComponent from "../textComponents/startingTextComponent";
import * as d3 from "d3";
import SolarSystemGraph from "../solarSystemGraph/SolarSystemGraph";
import { isMobile } from "react-device-detect";
import SuperBigHeaderComponent from "./SuperBigHeaderComponent";

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
        top: 0,
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
        style={{
          zIndex: 99,
          maxWidth: innerHeight, // '100%',
          maxHeight: innerWidth,
          marginLeft: "auto",
          marginRight: "auto",
          // transform: `translate(0px, ${zoom}px)`,
          opacity: sunImageOpacity,
        }}
        src={sunImage}
      ></img>
    </div>
  );
}
