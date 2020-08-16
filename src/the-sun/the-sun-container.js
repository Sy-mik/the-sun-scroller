import React, { useState, useEffect, useRef } from "react";
// import { useSpring, animated } from "react-spring"
import StartingSunImageWithSolarSystemGraphContainer from "./beggining/StartingSunImageWithSolarSystemGraphContainer";
import HistoryOfSunScaleContainer from "./historyOfSunScale/history-of-sun-scale-container";
import SlidingTextWithOpacityContainer from "./animations/sliding-text-with-opacity-container";
import SuperBigHeaderComponent from "./beggining/SuperBigHeaderComponent";
import SpinningSunContainer from "./spinningSun/spinning-sun-container";
import StellarNurseryContainer from "./historyOfSunScale/stellarNursery";

export default function TheSunContainer() {
  const [scrollPosition, setSrollPosition] = useState();

  const handleScroll = () => {
    const position = window.pageYOffset;

    setSrollPosition(position);
  };

  // todo - worked fine before
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    // Workaround for not defined window during build
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
      {/* <p style={{ color: "white", position: "fixed", zIndex: 100 }}>
        scrollPosition - {scrollPosition}{" "}
      </p> */}
      <SuperBigHeaderComponent></SuperBigHeaderComponent>

      <StartingSunImageWithSolarSystemGraphContainer
        scrollPosition={scrollPosition}
        height={10000}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        graphEndingRef={graphEndingRef}
      ></StartingSunImageWithSolarSystemGraphContainer>
      <div
        ref={graphEndingRef}
        style={{ height: 0, backgroundColor: "black" }}
      ></div>
      {/* 
      <div style={{ width: "100%", backgroundColor: "black" }}>
        <SlidingTextWithOpacityContainer
          height={300}
          fontSize={60}
          windowHeight={windowHeight}
          headerText={"History starts here"}
          color={"white"}
          scrollPosition={scrollPosition}
        ></SlidingTextWithOpacityContainer>
      </div> */}

      <div style={{ backgroundColor: "black", zIndex: 0 }}>
        <SlidingTextWithOpacityContainer
          height={300}
          fontStyle={"italic"}
          windowHeight={windowHeight}
          headerText={"Solar storms"}
          color={"white"}
          scrollPosition={scrollPosition}
        ></SlidingTextWithOpacityContainer>
      </div>
      <div
        style={{
          height: 300,
          width: "100%",
          backgroundColor: "black",
          zIndex: 0,
        }}
      ></div>

      <SpinningSunContainer
        innerWidth={windowWidth}
        innerHeight={windowHeight}
        scrollPosition={scrollPosition}
      ></SpinningSunContainer>
      <div style={{ height: 500 }}>
        {/* <StellarNurseryContainer
        scrollPosition={scrollPosition}
        windowHeight={windowHeight}
        windowWidth={windowWidth}
      ></StellarNurseryContainer> */}
      </div>

      {/* <SpinningSunContainer
        innerWidth={windowWidth}
        innerHeight={windowHeight}
        scrollPosition={scrollPosition}
      ></SpinningSunContainer> */}

      {/* <HistoryOfSunScaleContainer //
        scrollPosition={scrollPosition}
      ></HistoryOfSunScaleContainer> */}
      {/*
      <SlidingTextWithOpacityContainer
        height={300}
        fontStyle={"italic"}
        windowHeight={windowHeight}
        headerText={"4.6 billions years ago"}
        color={"white"}
        scrollPosition={scrollPosition}
      ></SlidingTextWithOpacityContainer>
      <div style={{ height: 200 }}></div> */}

      {/* <MeetTheProtostarContainer2
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        scrollPosition={scrollPosition}
      ></MeetTheProtostarContainer2> */}

      {/* <div style={{ height: windowHeight / 2, backgroundColor: "black" }}>
        <SlidingTextWithOpacityContainer
          height={500}
          windowHeight={windowHeight}
          headerText={"The Main Sequence"}
          color={"white"}
          scrollPosition={scrollPosition}
        ></SlidingTextWithOpacityContainer>
      </div>
      <div style={{ height: "200px", backgroundColor: "black" }}></div>  */}

      {/* <div style={{ height: "5000px" }}></div> */}
      {/* <div style={{ height: "20px" }}></div> */}
    </div>
  );
}
