import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import SuperBigHeaderComponent from "../beggining/SuperBigHeaderComponent";
import TextAppearingFromBottomTransition from "../animations/text-appearing-from-bottom-transition";
// import * as from '../../assets/sun-images/'
import defaultImage from "../../assets/sun-images/image1.jpg";
import { ismobile } from "react-device-detect";
import * as d3 from "d3";
export default function SpinningSunContainer({
  scrollPosition,
  innerHeight,
  innerWidth,
}) {
  const images = require.context("../../assets/sun-images/", true);
  const [imgSrcIteration, setImgSrcIteration] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [sunImage, setSunImage] = useState(images("./" + `image${1}.jpg`));
  // images.forEach(image => (new Image().src = image.src));
  const preloadedImages = useRef([]);
  let height = 2 * innerHeight;
  const scrollScale = d3
    .scaleLinear()
    .domain([0, (1 / 2) * height])
    .range([0, 200]);
  let amountOfImages = 200;
  const ref = useRef();

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 0;
  };

  let sectionEnding = getOffset() + 1500;
  let sectionBeggining = getOffset();

  function fetchPreviousSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration <= amountOfImages) {
      // setImgSrcIteration(imgSrcIteration - 1);
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));
      if (
        preloadedImages.current[imgSrcIteration] &&
        preloadedImages.current[imgSrcIteration].src
      ) {
        setSunImage(preloadedImages.current[imgSrcIteration].src);
      }
    }
  }

  function fetchNewSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration < amountOfImages - 1) {
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));

      if (
        preloadedImages.current[imgSrcIteration] &&
        preloadedImages.current[imgSrcIteration].src
      ) {
        setSunImage(preloadedImages.current[imgSrcIteration].src);
      }
    }
  }

  function isWithinBoundaries() {
    return scrollPosition > getOffset() && scrollPosition < sectionEnding;
  }

  function isScrollingUp() {
    return prevScrollPosition > scrollPosition;
  }

  function isScrollingDown() {
    return prevScrollPosition < scrollPosition;
  }
  useEffect(() => {
    for (let i = 1; i < amountOfImages; i++) {
      const img = new Image();
      img.src = images(`./image${i}.jpg`);
      preloadedImages.current.push(img);
    }
  }, []);

  useEffect(() => {
    if (isWithinBoundaries() && isScrollingUp()) {
      fetchPreviousSunImage();
    } else if (isWithinBoundaries() && isScrollingDown()) {
      fetchNewSunImage();
    }
    if (imgSrcIteration > amountOfImages) {
      setImgSrcIteration(amountOfImages - 1);
    }
    setPrevScrollPosition(scrollPosition);
  }, [scrollPosition, prevScrollPosition]);

  return (
    <div ref={ref} style={{ height: height, backgroundColor: "black" }}>
      <img
        src={sunImage}
        style={{
          width: ismobile ? innerHeight / 2 : innerWidth / 2,
          position: "sticky",
          top: "20%",
        }}
        alt="spinning sun"
      />
      {/* <h1 style={{zIndex:100, position:'absolute', color: "white",
       transform: `translate(300%,${sectionBeggining}px)`  }}> SUN FLARES</h1> */}
    </div>
  );
}
