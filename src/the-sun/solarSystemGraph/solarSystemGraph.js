import React, { useState, useEffect, useRef } from "react";
import "./solarSystemGraph.css";
import DrawSolarGraph from "./drawSolarGraph";
export default function SolarSystemGraph({
  opacity,
  scrollPosition,
  height,
  windowWidth,
  windowHeight,
  endingGraphRef,
}) {
  // establish variables
  const ref = useRef();
  const scrollToRef = (ref) =>
    window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop - 300 });

  const [drawRealSizeGraph, setDrawRealSizeGraph] = useState(false);

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 100000;
  };
  useEffect(() => {
    if (
      scrollPosition - getOffset() < 1.5 * windowHeight &&
      drawRealSizeGraph
    ) {
      setDrawRealSizeGraph(false);
    } else if (
      scrollPosition - getOffset() > 1.5 * windowHeight &&
      !drawRealSizeGraph
    ) {
      setDrawRealSizeGraph(true);
    }
  }, [drawRealSizeGraph, scrollPosition]);
  // insert svg element
  function skipPlanets() {
    scrollToRef(endingGraphRef);
  }
  function goToTop() {
    scrollToRef(ref);
  }

  return (
    <div ref={ref} id={"graphContainer"} style={{ opacity: opacity }}>
      <DrawSolarGraph
        innerWidth={windowWidth}
        innerHeight={windowHeight}
        drawRealSizeGraph={drawRealSizeGraph}
        scrollPosition={scrollPosition}
        height={height}
        offset={getOffset()}
      ></DrawSolarGraph>
      <p
        className="onHoverClickableText"
        onClick={() => goToTop()}
        style={{
          display: opacity > 0 ? "inherit" : "none",
          position: "fixed",
          cursor: "pointer",
          top: 0,
          right: 20,
        }}
      >
        Beggining
      </p>
      <p
        className="onHoverClickableText"
        // onMouseEnter={()=>{}}
        onClick={() => skipPlanets()}
        style={{
          display: opacity > 0 ? "inherit" : "none",
          position: "fixed",
          cursor: "pointer",
          top: 30,
          right: 20,
          zIndex: 0,
          // color: "darkgray",
          // fill: "white",
        }}
      >
        History
      </p>
      {/* <div ref={endingGraphRef} style={{ height: windowHeight*2, width:0 }}></div> */}
    </div>
  );
}
