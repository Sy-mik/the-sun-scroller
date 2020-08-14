import React, { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import "./solarSystemGraph.css"
import SlidingTextWithOpacityParallaxContainer from "./animations/sliding-text-with-opacity-parallax-container"

export default function SolarSystemGraphTextComponent({
  opacity,
  scrollPosition,
}) {
  // establish variables
  const textReft = useRef()
  const getOffset = () => {
    if (textReft.current) {
      return textReft.current.offsetTop
    } else return 100000
  }
  useEffect(() => {
    let val = scrollPosition - getOffset()
    if (val > 0 && val < 800) {
      d3.select("#earth")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "#2F80ED")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "white")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "#2F80ED")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "white")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "#2F80ED")
        .transition()
        .duration(300) // miliseconds
        .style("fill", "white")
    }
  }, [scrollPosition])
  // insert svg element

  return (
    <div>
      <div ref={textReft}>
        <SlidingTextWithOpacityParallaxContainer
          containerStyle={{
            position: "fixed",
            margin: "auto",
            top: "3%",
            left: "3%",
            width: '18rem',
            zIndex: 100,
          }}
          height={1500}
          headerColor={"white"}
          color={"lightgray"}
          headerText={"Solar system"}
          text={
            "It shines with 3730000000000000000000000000 lumens that take about 8.3 minutes to reach Earth from the surface of the Sun"
          }
          fontSize={40}
          scrollPosition={scrollPosition}
        ></SlidingTextWithOpacityParallaxContainer>
      </div>
    </div>
  )
}
