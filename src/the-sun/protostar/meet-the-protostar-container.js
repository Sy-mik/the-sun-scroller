import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import wrap from "../wrapText";
export default function MeetTheProtostarContainer({
  scrollPosition,
  windowHeight,
  windowWidth
}) {
  const ref = useRef();
  // let innerHeight;
  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 100000;
  };

  const [zoom, setZoom] = useState(1);
  const scale = d3.scalePow().exponent(3).domain([0, windowHeight*5]).range([1, 1000]);

  useEffect(() => {
    // innerHeight = window.height;

    let zoomScale = scrollPosition - getOffset();
    if (zoomScale >= 1) {
      setZoom(scale(zoomScale));
    } else {
    }
  }, [scale, scrollPosition, windowHeight]);

  return (
    <div
      ref={ref}
      style={{
        height: windowHeight*10,
        width:'100%'
      }}
    >
      <svg
        class="knockout-text-container"
        width="100%"
        height="100%" // class="knockout"
        style={{
          position: "sticky",
          width: "100%",
          height:'100%',
          top: 0,
          height: window.innerHeight,
          backgroundRepeat:'no-repeat',
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

        {/*
        
         It ends when the
            infalling gas is depleted, leaving a pre-main-sequence star, which
            contracts to later become a main-sequence star at the onset of
            hydrogen fusion producing helium.
        <text
          id="meetTheProtostartText"
          style={{ transformOrigin: "center" }}
          zIndex={100}
          z-index="100"
          x="20%"
          y="20%"
          dominant-baseline="middle"
          text-anchor="middle"
          style={{}}
          // font-size="2em"
          // letter-spacing="10"
          // fontWeight="600"
          color="white"
          fill="white"
        >
          Hello there
        </text> */}

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
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="2em"
            letter-spacing="10"
            fontWeight="600"
          >
            MEET THE PROTOSTAR
          </text>
          {/* 
            <text x="50%" y="100" fill="#000" text-anchor="middle">
              Mama Said
            </text>
            <text x="50%" y="175" fill="#000" text-anchor="middle">
              Knock You
            </text>
            <text x="50%" y="365" fill="#000" text-anchor="middle">
              Out
            </text> */}
        </mask>

        {/* <foreignobject class="node" x="46" y="22" width="500" height="500">
          <p
            dominant-baseline="start"
            text-anchor="start"
            style={{
               color: "white",
              fill: "white",
            }}
            color="white"
            fill="white"
            font-size="2em"
            // letter-spacing="10"
            fontWeight="600"
          >
            A protostar is a very young star that is still gathering mass from
            its parent molecular cloud. The protostellar phase is the earliest
            one in the process of stellar evolution.[1] For a low mass star
            (i.e. that of the Sun or lower), it lasts about 500,000 years.[2]
            The phase begins when a molecular cloud fragment first collapses
            under the force of self-gravity and an opaque, pressure supported
            core forms inside the collapsing fragment. It ends when the
            infalling gas is depleted, leaving a pre-main-sequence star, which
            contracts to later become a main-sequence star at the onset of
            hydrogen fusion producing helium.
          </p>{" "}
        </foreignobject> */}
      </svg>
      {/* <svg
        style={{
          position: "sticky",
          width: "100%",
          backgroundImage:
            'url("https://i.pinimg.com/originals/04/96/92/0496927c2861e4682b10325d9993e683.jpg")',
          height: windowHeight,
          top: "0",
          zIndex: -100,
        }}
      >
        <rect
          style={{ transformOrigin: "center", transform: `scale(${zoom})` }}
          width="100%"
          height="100%"
          fill="#000"
          x="0"
          y="0"

          // width="100%"
          // height="100%"
          // fill="black"
          // fill-opacity="1"
          mask="url(#mask)"
        />

          <mask id="mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              zIndex={100}
              z-index="100"
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              style={{}}
              font-size="5em"
              letter-spacing="10"
              fontWeight="600"
              fill="white"
            >
              MEET THE PROTOSTAR
            </text>
          </mask>
      </svg> */}
    </div>
  );
}
