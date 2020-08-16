import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import wrap from "../wrapText";
export default function StellarNurseryContainer({
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
    .exponent(4)
    .domain([0, windowHeight * 5])
    .range([1, 1000]);

  useEffect(() => {
    // innerHeight = window.height;

    let zoomScale = scrollPosition - getOffset();
    console.log(zoomScale);
    if (scrollPosition - getOffset() > -windowHeight / 3) {
      setBackgroundOpacity(1);
    } else {
      setBackgroundOpacity(0);
    }
    if (zoomScale >= 1) {
      //   setBackgroundOpacity(1);
      setZoom(scale(zoomScale));
    }
    //   setBackgroundOpacity(0);
    // }
  }, [scale, scrollPosition, windowHeight]);

  return (
    <div
      ref={ref}
      style={{
        height: windowHeight * 5,
        width: "100%",
        transformOrigin: "center",
        backgroundColor:'black'
      }}
    >
      <img
        style={{
          opacity: backgroundOpacity,
          position: "fixed",
          // height: "100%",
          top: 0,
          zIndex:0,
          backgroundSize:'cover'
        }}
        src="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/06/a_stormy_stellar_nursery/17005259-1-eng-GB/A_stormy_stellar_nursery_pillars.jpg"
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
        <text
          id="meetTheProtostartText"
          style={{ transformOrigin: "center" }}
          zIndex={100}
          z-index="100"
          x="50%"
          y="50%"
          fill="white"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="1.8em"
          letter-spacing="7"
          fontWeight="600"
        >
          Steallar Nursery
        </text>
        "From the cosmic soup the sun was born. Gas and dust contracted into a giant cloud, then floated in one of the spiral arms of the Milky Way."

        <defs>
          {/* <rect id="gradient" width="100%" height="100%" fill="#fff" x="0" y="0" /> */}
          <mask id="mask">
            <rect width="100%" height="100%" fill="#fff" />

            <svg
              x={windowWidth / 2 - 50}
              y={windowHeight / 2 - 50}
              height="100"
              viewBox="0 0 480 480"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
              opacity={1}
            >
              <path d="m464 0c-.070312 48.289062-11.957031 95.832031-34.625 138.472656-4.28125-1.589844-8.808594-2.425781-13.375-2.472656-22.082031.027344-39.972656 17.917969-40 40 .039062 9.101562 3.210938 17.910156 8.984375 24.945312-9.167969 10.023438-19.019531 19.402344-29.488281 28.0625l-19.761719 16.167969c.097656-1.726562.265625-3.433593.265625-5.175781-.007812-15.199219-3.648438-30.175781-10.617188-43.679688l4.425782-44.160156c1.96875-19.949218 1.992187-40.042968.078125-60 10.25-5.8125 15.730469-17.445312 13.691406-29.046875-2.042969-11.601562-11.164063-20.664062-22.777344-22.632812-3.667969-13.796875-8.28125-27.320313-13.816406-40.480469h-17.601563c6.164063 13.75 11.257813 27.957031 15.242188 42.488281-11.800781 5.152344-18.53125 17.726563-16.273438 30.402344 2.257813 12.679687 12.914063 22.15625 25.769532 22.917969 1.613281 18.21875 1.519531 36.550781-.273438 54.75l-2.511718 25.441406c-11.308594-12.640625-25.757813-22.066406-41.886719-27.320312l-28.050781-34.28125c-13.214844-16.109376-28.023438-30.851563-44.191407-44 1.820313-4.582032 2.769531-9.464844 2.792969-14.398438.054688-16.457031-10.003906-31.257812-25.328125-37.257812-15.320313-6.003907-32.757813-1.976563-43.894531 10.136718-41-18.941406-85.613282-28.7968748-130.777344-28.878906v16c42.25.082031 83.996094 9.171875 122.457031 26.664062-1.582031 4.269532-2.414062 8.78125-2.457031 13.335938-.039062 16.261719 9.78125 30.925781 24.835938 37.074219 15.054687 6.152343 32.332031 2.5625 43.691406-9.074219 14.777344 12.167969 28.335937 25.746094 40.480468 40.542969l16.160157 19.761719c-1.71875-.136719-3.425781-.304688-5.167969-.304688-15.203125.003906-30.179688 3.648438-43.6875 10.625l-44.167969-4.425781c-24.976562-2.429688-50.15625-1.847657-74.992187 1.738281-5.609375-11.808594-18.660156-18.140625-31.40625-15.25-12.746094 2.894531-21.78125 14.242188-21.746094 27.3125v.398438c-7.550781 2.511718-15.046875 5.21875-22.398438 8.3125v17.3125c8.839844-4 17.925782-7.34375 27.109376-10.398438 6.460937 9.652344 18.222656 14.296875 29.535156 11.65625s19.804687-12.011719 21.320312-23.527344c23.5-3.359375 47.3125-3.898437 70.9375-1.601562l25.496094 2.511718c-12.640625 11.3125-22.0625 25.765626-27.3125 41.894532l-34.289062 28.058594c-15.308594 12.585937-29.394532 26.597656-42.0625 41.839843-6.941407-5.453125-15.507813-8.429687-24.335938-8.457031-18.460938-.058594-34.550781 12.566406-38.882812 30.511719-4.335938 17.949219 4.21875 36.523437 20.675781 44.894531-19.527344 41.484375-29.6953128 86.746094-29.792969 132.59375h16c.085938-44.417969 10.144531-88.246094 29.433594-128.257812.863281.058593 1.6875.257812 2.566406.257812 22.082031-.027344 39.972656-17.917969 40-40-.050781-6.734375-1.816406-13.339844-5.136719-19.199219 12.453125-15.269531 26.386719-29.269531 41.601563-41.792969l19.765625-16.167968c-.09375 1.726562-.261719 3.433594-.261719 5.175781.007812 15.199219 3.644531 30.175781 10.617188 43.679687l-4.425782 44.160157c-1.96875 19.949219-2 40.042969-.089844 60-10.246093 5.816406-15.726562 17.449219-13.679687 29.054687 2.042969 11.601563 11.167969 20.664063 22.785156 22.625 3.679688 13.789063 8.304688 27.3125 13.839844 40.464844h17.601563c-6.152344-13.746094-11.25-27.941406-15.242188-42.464844 11.769531-5.1875 18.464844-17.746094 16.207031-30.410156-2.253906-12.660156-12.875-22.136719-25.710937-22.941406-1.605469-18.214844-1.511719-36.542969.28125-54.742188l2.511718-25.441406c11.308594 12.640625 25.757813 22.066406 41.886719 27.320312l28.058594 34.28125c10.914063 13.289063 22.914063 25.65625 35.871094 36.964844-1.601563 4.300782-2.441407 8.847656-2.480469 13.433594-.082031 15.75 9.128906 30.066406 23.492188 36.519531 14.367187 6.457031 31.1875 3.832031 42.90625-6.6875 43.851562 22.386719 92.367187 34.09375 141.601562 34.167969v-16c-45.765625-.082031-90.890625-10.761719-131.839844-31.199219 2.5-5.25 3.8125-10.988281 3.839844-16.800781.050781-16.414062-9.960938-31.1875-25.226562-37.21875-15.269532-6.03125-32.671876-2.089844-43.851563 9.929688-11.492187-10.226563-22.164063-21.332032-31.929687-33.214844l-16.160157-19.761719c1.71875.097656 3.425781.265625 5.167969.265625 15.203125-.003906 30.179688-3.648438 43.6875-10.625l44.160156 4.425781c8.191406.800781 16.671875 1.214844 25.230469 1.390625.242187 1.085938.546875 2.152344.921875 3.199219 4.589844 12.019531 16.820312 19.324219 29.578125 17.667969 12.757813-1.652344 22.71875-11.835938 24.09375-24.625 24.851563-3.871094 49.140625-10.75 72.328125-20.488282v-17.511718c-23.90625 10.699218-49.136719 18.164062-75.015625 22.199218-4.804687-9.792968-14.871094-15.886718-25.773437-15.605468-10.902344.285156-20.640626 6.890625-24.929688 16.917968-.3125.734376-.472656 1.503907-.722656 2.253907-8.191406-.160157-16.300782-.542969-24.117188-1.320313l-25.441406-2.542968c12.640625-11.3125 22.0625-25.765626 27.3125-41.894532l34.289062-28.058594c11.308594-9.28125 21.945313-19.363281 31.824219-30.160156 5.703125 3.097656 12.082031 4.738282 18.574219 4.777344 16.460938.054688 31.265625-10.015625 37.261719-25.347656 5.996093-15.328125 1.953125-32.769532-10.171875-43.898438 24.160156-45.148437 36.839844-95.546875 36.910156-146.753906zm0 0" />
              <path d="m112 320h16v16h-16zm0 0" />
              <path d="m48 80h16v16h-16zm0 0" />
              <path d="m96 112h16v16h-16zm0 0" />
              <path d="m240 56h16v16h-16zm0 0" />
              <path d="m360 104h16v16h-16zm0 0" />
              <path d="m400 80h16v16h-16zm0 0" />
              <path d="m424 256h16v16h-16zm0 0" />
              <path d="m440 360h16v16h-16zm0 0" />
              <path d="m400 392h16v16h-16zm0 0" />
              <path d="m216 408h16v16h-16zm0 0" />
              <path d="m56 224h16v16h-16zm0 0" />
              <path d="m96 376h16v16h-16zm0 0" />
              <path d="m112 456h16v16h-16zm0 0" />
              <path d="m388.839844 56c-5.691406-7.039062-12.109375-13.460938-19.144532-19.160156 7.039063-5.691406 13.457032-12.113282 19.144532-19.152344 5.691406 7.042969 12.117187 13.460938 19.160156 19.152344-7.042969 5.695312-13.464844 12.117187-19.160156 19.160156zm0 0" />
              <path d="m71.761719 445.335938c-6.40625-7.941407-13.632813-15.179688-21.5625-21.601563 7.945312-6.414063 15.1875-13.652344 21.601562-21.597656 6.402344 7.941406 13.628907 15.179687 21.558594 21.597656-7.941406 6.421875-15.179687 13.660156-21.597656 21.601563zm0 0" />
            </svg>
          </mask>
        </defs>
        <rect
          style={{
            transformOrigin: "center",
            transform: `matrix(${zoom}, 0, 0, ${zoom}, 0, 0)`,
          }}
          width="100%"
          height="100%"
          fill="black"
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
