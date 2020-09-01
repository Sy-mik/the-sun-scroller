import React, { useState, useEffect, useRef } from "react";
import StartingImageComponent from "./StartingImageComponent";
import StartingTextComponent from "./StartingTextComponent";
import * as d3 from "d3";
import { isMobile } from "react-device-detect";
import SolarSystemGraph from "./solarSystemGraph/SolarSystemGraph";

export default function IntroAndGraphContainer({
  scrollPosition,
  windowWidth,
  windowHeight,
  graphEndingRef,
}) {
  const ref = useRef();

  const solarSystemRef = useRef();

  const [sunImage, setSunImage] = useState(
    "https://static01.nyt.com/images/2020/03/10/science/25OBS-SUNSPOT1/25TB-SUNSPOT1-mediumSquareAt3X.jpg"
  );

  const [translateSunY, setTranslateSunY] = useState(0);
  const [solarSystemGraphOpacity, setSolarSystemGraphOpacity] = useState(0);
  const [sunImageOpacity, setSunImageOpacity] = useState(1);

  const [visible, setVisible] = useState(false);
  let innerHeight = windowHeight;
  let innerWidth = windowWidth;
  const getOffset = (currrentRef) => {
    if (currrentRef.current) {
      return currrentRef.current.offsetTop;
    } else return 100000;
  };
  const exponent = isMobile ? 1 : 1;
  const scale = d3.scalePow().exponent(2).domain([0, 2500]).range([0, 500]); //d3.scalePow().exponent(4).domain([0, 2000]).range([1, 0]);

  const opacityScale = d3
    .scalePow()
    .exponent(exponent)
    .domain([0, 1000])
    .range([0, 1]);

  useEffect(() => {
    let zoomScale = scrollPosition - getOffset(ref);
    if (scale(zoomScale) <= innerHeight) {
      setTranslateSunY(scale(zoomScale));
    }
    if (zoomScale > 0 && scale(zoomScale) >= 0) {
      setVisible(true);
      setSunImageOpacity(1 - solarSystemGraphOpacity);
    }
    let graphScale = scrollPosition - getOffset(solarSystemRef) + 100;
    setSolarSystemGraphOpacity(opacityScale(graphScale));
    setSunImageOpacity(1 - solarSystemGraphOpacity);
    if (scrollPosition > graphEndingRef.current.offsetTop) {
      setSunImageOpacity(0);
      setVisible(false);
    }
  }, [
    graphEndingRef,
    innerHeight,
    opacityScale,
    scale,
    scrollPosition,
    solarSystemGraphOpacity,
  ]);

  return (
    <div
      style={{
        height: 16 * innerHeight,
        zIndex: 99,
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <div ref={ref}></div>

      <StartingImageComponent
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        scrollPosition={scrollPosition}
        sunImageOpacity={sunImageOpacity}
        sunImage={sunImage}
        zoom={translateSunY}
      ></StartingImageComponent>

      <div style={{ visible: visible ? "block" : "none" }}>
        <StartingTextComponent
          display={visible}
          scrollPosition={scrollPosition}
        ></StartingTextComponent>
      </div>

      <div ref={solarSystemRef}></div>

      <SolarSystemGraph
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        scrollPosition={scrollPosition}
        opacity={solarSystemGraphOpacity}
        endingGraphRef={graphEndingRef}
      ></SolarSystemGraph>
    </div>
  );
}
