import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import wrap from "../wrapText";
export default function MeetTheProtostarContainer2({
  scrollPosition,
  windowHeight,
  windowWidth,
}) {
  const ref = useRef();
  // let innerHeight;
  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 100000;
  };

  const [zoom, setZoom] = useState(1);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const scale = d3
    .scalePow()
    .exponent(3)
    .domain([0, windowHeight * 5])
    .range([1, 1000]);

  useEffect(() => {
    // innerHeight = window.height;

    let zoomScale = scrollPosition - getOffset();
    if (zoomScale >= 1) {
      setBackgroundOpacity(1);
      setZoom(scale(zoomScale));
    } else {
      setBackgroundOpacity(0);
    }
  }, [scale, scrollPosition, windowHeight]);

  return (
    <div
      ref={ref}
      style={{
        height: windowHeight * 10,
        width: "100%",
        transformOrigin: "center",
      }}
    >
      <img
        style={{
          opacity: backgroundOpacity,
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          zIndex: -1,
        }}
        src="https://i.pinimg.com/originals/04/96/92/0496927c2861e4682b10325d9993e683.jpg"
        alt=""
      ></img>
      <svg
        style={{
          position: "sticky",
          top: "0",
        }}
        width={windowWidth}
        height={windowHeight}
      >
        <defs>
          {/* <rect id="gradient" width="100%" height="100%" fill="#fff" x="0" y="0" /> */}
          <linearGradient id="gradient">
            <stop offset="15%" stop-color="black" />
            <stop offset="80%" stop-color="black" />
          </linearGradient>
          <mask id="mask">
            <rect width="100%" height="100%" fill="#fff" />

            <text
              id="meetTheProtostartText"
              style={{ transformOrigin: "center" }}
              zIndex={100}
              z-index="100"
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              font-size="2em"
              letter-spacing="10"
              fontWeight="600"
            >
              MEET THE PROTOSTAR
            </text>
          </mask>
        </defs>
        <rect
          style={{
            transformOrigin: "center",
            transform: `scale(${zoom})`,
          }}
          width="100%"
          height="100%"
          fill="url(#gradient)"
          mask="url(#mask)"
        />
      </svg>{" "}
      {/* <svg
        class="knockout-text-container"
        width="100%"
        height="100%" // class="knockout"
        style={{
          position: "sticky",
          width: "100%",
          height: "100%",
          top: 0,
          height: window.innerHeight,
          backgroundRepeat: "no-repeat",
          backgroundImage:
            'url("https://i.pinimg.com/originals/04/96/92/0496927c2861e4682b10325d9993e683.jpg")',
        }}
      >
        <foreignObject x="10%" y="130" width="30em" height="500">
          <p
            style={{
              color: "lightgray",
              fill: "lightgray",
              fontSize: "25px",
              textAlign: "left",
            }}
          >
            A protostar is a very young star that is still gathering mass from
            its parent molecular cloud. The protostellar phase is the earliest
            one in the process of stellar evolution. For a low mass star (i.e.
            that of the Sun or lower), it lasts about 500,000 years.
          </p>
        </foreignObject>
        <rect
          style={{
            transformOrigin: "center",
            transform: `scale(${zoom})`,
          }}
          width="100%"
          height="100%"
          fill="#000"
          x="0"
          y="0"
          fill-opacity="1"
          mask="url(#knockout-text)"
        />

        <mask id="knockout-text">
          <rect width="100%" height="100%" fill="#fff" x="0" y="0" />

          <text
            id="meetTheProtostartText"
            style={{ transformOrigin: "center" }}
            zIndex={100}
            z-index="100"
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            style={{}}
            font-size="2em"
            letter-spacing="10"
            fontWeight="600"
          >
            MEET THE PROTOSTAR
          </text>
        </mask>
      </svg>{" "} */}
    </div>
  );
}

{
  /* <img src="https://s.cdpn.io/387787/header.jpg" alt="">
<svg width="100%" height="1280">
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(75)">
      <stop offset="15%" stop-color="#1a237e" />
      <stop offset="80%" stop-color="#00e5ff" />
    </linearGradient>
    <mask id="mask">
      <rect width="100%" height="100%" fill="#fff" />
      <text x="10%" y="25%" font-size="4em" font-weight="300">Introducing</text>
      <text x="10%" y="50%" font-size="17em" letter-spacing="10">SVG MASK</text>
    </mask>
  </defs>
  <rect width="100%" height="100%" fill="url(#gradient)" fill-opacity="0.8" mask="url(#mask)" />
</svg> */
}
