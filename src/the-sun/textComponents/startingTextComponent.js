import React, { useState, useEffect, useRef } from "react"
import { isMobile } from "react-device-detect"

import SlidingTextWithOpacityParallaxContainer from "../animations/sliding-text-with-opacity-parallax-container"
import { constants } from "../../constants"

export default function StartingTextComponent({ scrollPosition }) {
  return (
    <SlidingTextWithOpacityParallaxContainer
      containerStyle={{
        position: "fixed",
        margin: "auto",
        top: "10%",
        width: "100%",
        textAlign: "center",
        maxWidth: constants.defaultParagraphWidth,
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: 100,
      }}
      height={500}
      headerText={"The heart of our solar system"}
      headerColor={"white"}
      color={"white"}
      text={
        "The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and aurorae. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy."
      }
      fontSize={40}
      scrollPosition={scrollPosition}
    ></SlidingTextWithOpacityParallaxContainer>
  )
}
