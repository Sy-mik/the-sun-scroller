import React, { useState, useEffect, useRef } from "react";
import SlidingTextWithOpacityParallaxContainer from "../animations/sliding-text-with-opacity-parallax-container";
import StartingImageComponent from "./startingImageComponent";
import StartingTextComponent from "../textComponents/startingTextComponent";
import * as d3 from "d3";
import SolarSystemGraph from "../solarSystemGraph/solarSystemGraph";
import { isMobile } from "react-device-detect";
import SuperBigHeaderComponent from "./SuperBigHeaderComponent";

export default function StartingSunImageWithSolarSystemGraphContainer({
  scrollPosition,
  height,
  windowWidth,
  windowHeight,
  graphEndingRef,
}) {
  const ref = useRef();

  const solarSystemRef = useRef();

  const [sunImage, setSunImage] = useState(
    "https://static01.nyt.com/images/2020/03/10/science/25OBS-SUNSPOT1/25TB-SUNSPOT1-mediumSquareAt3X.jpg"
  );
  const [zoom, setZoom] = useState(1);
  const [solarSystemGraphOpacity, setSolarSystemGraphOpacity] = useState(1);
  const [visible, setVisible] = useState(false);
  let innerHeight = windowHeight;
  let innerWidth = windowWidth;
  const getOffset = (currrentRef) => {
    if (currrentRef.current) {
      return currrentRef.current.offsetTop;
    } else return 100000;
  };

  const scale = d3.scalePow().exponent(4).domain([0, 2000]).range([1, 0]);
  const opacityScale = d3
    .scalePow()
    .exponent(2)
    .domain([0, 1000])
    .range([0, 1]);

  useEffect(() => {
    let zoomScale = scrollPosition - getOffset(ref);
    if (zoomScale > 0 && scale(zoomScale) >= 0) {
      setVisible(true);
      setZoom(scale(zoomScale));
    }
    let graphScale = scrollPosition - getOffset(solarSystemRef) + 100;
    setSolarSystemGraphOpacity(opacityScale(graphScale));

    if (scrollPosition > graphEndingRef.current.offsetTop) {
      setSolarSystemGraphOpacity(opacityScale(0));
    }
  }, [opacityScale, scale, scrollPosition]);

  return (
    <div
      style={{
        height: 16 * innerHeight,
        zIndex: 99,
        width: "100%",
      }}
    >
      <div ref={ref}></div>

      <StartingImageComponent
        height={height}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        scrollPosition={scrollPosition}
        solarSystemGraphOpacity={solarSystemGraphOpacity}
        sunImage={sunImage}
        zoom={zoom}
      ></StartingImageComponent>

      <div style={{ visibility: visible ? "visible" : "hidden" }}>
        <StartingTextComponent
          scrollPosition={scrollPosition}
        ></StartingTextComponent>
      </div>
      <div ref={solarSystemRef}></div>

      <SolarSystemGraph
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        scrollPosition={scrollPosition}
        opacity={solarSystemGraphOpacity}
        height={height}
        endingGraphRef={graphEndingRef}
      ></SolarSystemGraph>
    </div>
  );
}
