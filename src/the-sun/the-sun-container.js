import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import SuperBigHeaderComponent from "./beggining/SuperBigHeaderComponent";
import SpinningSunContainer from "./spinningSun/SpinningSunContainer";
import IntroAndGraphContainer from "./beggining/IntroAndGraphContainer";
import "./the-sun.css";
import LearnMoreChatContainer from "./learn-more-chat/LearnMoreChatContainer";
export default function TheSunContainer() {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [width, height] = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const handleScroll = () => {
    const position = window.pageYOffset;

    setSrollPosition(position);
  };

  useEffect(() => {
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

      <IntroAndGraphContainer
        scrollPosition={scrollPosition}
        windowWidth={width}
        windowHeight={height}
        graphEndingRef={graphEndingRef}
      ></IntroAndGraphContainer>
      <div
        ref={graphEndingRef}
        style={{ height: 0, backgroundColor: "black" }}
      ></div>

      <h1> Solar flares</h1>

      <SpinningSunContainer
        innerWidth={width}
        innerHeight={height}
        scrollPosition={scrollPosition}
      ></SpinningSunContainer>
      <LearnMoreChatContainer></LearnMoreChatContainer>
    </div>
  );
}
