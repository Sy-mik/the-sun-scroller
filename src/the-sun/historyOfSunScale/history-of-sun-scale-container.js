import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3" //
import HistoryOfSunScaleContent from "./history-of-sun-scale-content"
import HistoryOfSunFirstSection from "./history-of-sun-first-section"

export default function HistoryOfSunScaleContainer({
  scrollPosition,
  setFixedImage,
  windowHeight
}) {
  const xScale = d3.scaleLinear().domain([0, 14]).range([10, 20000])
  const ref = useRef()
  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop
    } else return 100000
  }
  return (
    <div ref={ref} style={{height:2000}}>
      <div>
          <HistoryOfSunScaleContent
            sectionBeggining={getOffset() - 300}
            xScale={xScale}
            scrollPosition={scrollPosition}
          ></HistoryOfSunScaleContent>
          <HistoryOfSunFirstSection
            sectionBeggining={getOffset()}
            xScale={xScale}
            scrollPosition={scrollPosition}
          ></HistoryOfSunFirstSection>
      </div>
    </div>
  )
}
