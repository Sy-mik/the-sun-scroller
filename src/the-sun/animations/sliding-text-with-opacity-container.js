import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3"; //
import SlidingTextWithOpacity from "./sliding-text-with-opacity";

export default function SlidingTextWithOpacityContainer({
  height,
  headerText,
  text,
  fontSize,
  scrollPosition,
  style,
  color,
  containerStyle,
  windowHeight,
}) {
  const ref = useRef();

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 100000;
  };

  if (!containerStyle) {
    containerStyle = {
      position: "sticky",
      textAlign: "center",
      left: "50%",
      top: "50%",
      zIndex: 100,
    };
  }
  const [windowHeightOffset, setWindowHeightOffset] = useState(0);

  const margin = d3.scaleSqrt().domain([0, height]).range([0, 20]);

  const opacityScaleFadingOut = d3
    .scalePow()
    .exponent(2)
    .domain([height / 2, height])
    .range([1, 0]);
  const opacityScaleFadingIn = d3
  .scalePow()
  .exponent(2)
  .domain([0, height / 2])
    .range([0, 1]);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setWindowHeightOffset(windowHeight / 2); // centered text

    if (windowHeightOffset + scrollPosition - getOffset() < height / 2) {
      let op = opacityScaleFadingIn(
        windowHeightOffset + scrollPosition - getOffset() + (1 / 2) * height
      );
      setOpacity(op);
    } else if (windowHeightOffset + scrollPosition - getOffset() > height / 2) {
      let op = opacityScaleFadingOut(
        windowHeightOffset + scrollPosition - getOffset() - (1 / 2) * height
      );
      setOpacity(op);
    }
  }, [scrollPosition]);

  return (
    <div ref={ref} style={{ height: height + "px", zIndex: 100 }}>
      <SlidingTextWithOpacity
        height={height}
        headerText={headerText}
        text={text}
        fontSize={fontSize}
        scrollPosition={scrollPosition}
        style={style}
        color={color}
        customPosition={true}
        opacity={opacity}
        containerStyle={containerStyle}
        marginBottom={margin(scrollPosition)}
      ></SlidingTextWithOpacity>
    </div>
  );
}
