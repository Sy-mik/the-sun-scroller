import React, { useState, useEffect, useRef } from "react";
import SuperBigHeaderComponent from "./beggining/SuperBigHeaderComponent";
import SpinningSunContainer from "./spinningSun/spinning-sun-container";
import SolarSystemGraphContainer from "./beggining/IntroAndGraphComponent";

export default function TheSunContainer() {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;

    setSrollPosition(position);
  };

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const position = window.pageYOffset;

    setSrollPosition(position);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const graphEndingRef = useRef();

  return (
    <div>
      <SuperBigHeaderComponent></SuperBigHeaderComponent>

      <SolarSystemGraphContainer
        scrollPosition={scrollPosition}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        graphEndingRef={graphEndingRef}
      ></SolarSystemGraphContainer>
      <div
        ref={graphEndingRef}
        style={{ height: 0, backgroundColor: "black" }}
      ></div>

        <SpinningSunContainer
          innerWidth={windowWidth}
          innerHeight={windowHeight}
          scrollPosition={scrollPosition}
        ></SpinningSunContainer>
        
    </div>
  );
}
