import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import wrap from "../wrapText";
import "./mask.scss";
import maskImage from "./mask-01.png";
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

    setZoom(scale(zoomScale));

    d3.select("#transformedRect").style("-webkit-transform", `scale(${zoom})`);

    console.log(zoomScale);
    if (scrollPosition - getOffset() > -windowHeight / 3) {
      setBackgroundOpacity(1);
    } else {
      setBackgroundOpacity(0);
    }
    if (zoomScale >= 1) {
      //   setBackgroundOpacity(1);            transform: `matrix(${zoom}, 0, 0, ${zoom}, 0, 0)`,

      setZoom(scale(zoomScale));
    }
    //   setBackgroundOpacity(0);
    // }
  }, [scale, scrollPosition, windowHeight]);

  return (
    <div ref={ref}>
      <main class="cd-image-mask-effect">
        <section class="project-1 cd-project-mask">
          <h1>Project Name</h1>
          <div class="featured-image"></div>
          <div class="mask">
            <img src={maskImage} alt="mask"></img>
          </div>

          <a href="#0" class="project-trigger">
            Explore Project
          </a>

          <a href="#0" class="cd-scroll cd-img-replace">
            Scroll down
          </a>

          <div class="cd-project-info" data-url="project-1"></div>

          <a href="#0" class="project-close cd-img-replace">
            Close Project
          </a>
        </section>
      </main>
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
