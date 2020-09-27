import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import SpinningSunComponent from "./SpinningSunComponent";

export default function SpinningSunContainer({
  scrollPosition,
  innerHeight,
  innerWidth,
}) {
  const images = require.context("../../assets/sun-images/", true);
  const [imgSrcIteration, setImgSrcIteration] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [sunImage, setSunImage] = useState(images("./" + `image${1}.jpg`));
  const ref = useRef();
  const ending = useRef();
  // images.forEach(image => (new Image().src = image.src));
  const preloadedImages = useRef([]);
  const amountOfImages = 50;

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 0;
  };

  const getOffsetEnding = () => {
    if (ending.current) {
      return ending.current.offsetTop;
    } else return 0;
  };

  const spaceBetweenContainer = getOffsetEnding() - getOffset();

  const scrollScale = d3
    .scaleLinear()
    .domain([0, spaceBetweenContainer])
    .range([0, amountOfImages]);

  function fetchPreviousSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration <= amountOfImages) {
      // setImgSrcIteration(imgSrcIteration - 1);
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));
      setSunImage(preloadedImages.current[imgSrcIteration].src);
    }
  }

  function fetchNewSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration < amountOfImages - 1) {
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));
      setSunImage(preloadedImages.current[imgSrcIteration].src);
    }
  }

  function isWithinBoundaries() {
    return scrollPosition > getOffset() && scrollPosition < getOffsetEnding();
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
  });

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
    <div ref={ref} style={{ backgroundColor: "black" }}>
      <SpinningSunComponent
        ending={ending}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        scrollPosition={scrollPosition}
        sunImage={sunImage}
      ></SpinningSunComponent>
      <div ref={ending} style={{ height: 300 }}></div>
    </div>
  );
}
