import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3" //
import SlidingTextWithOpacity from "../animations/sliding-text-with-opacity"
import MeetTheProtostarContainer from "../protostar/meet-the-protostar-container"
import SlidingTextWithOpacityContainer from "../animations/sliding-text-with-opacity-container"

export default function HistoryOfSunFirstSection({
  sectionBeggining,
  xScale,
  scrollPosition,
  windowHeight
}) {
  const [isDisplayed, setIsDisplayed] = useState(false)
  useEffect(() => {
    let sectionStart = sectionBeggining + xScale(1)
    if (scrollPosition > sectionStart + 50) {
      setIsDisplayed(true)
    } else {
      setIsDisplayed(false)
    }
  }, [scrollPosition, isDisplayed])
  return (
    <div
      style={{
        // height: "1000px",
        paddingTop: 500,
      }}
    >
      <div style={{ height: "10%" }}></div>
    </div>
  )
}
