import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import SuperBigHeaderComponent from "../beggining/SuperBigHeaderComponent";
import TextAppearingFromBottomTransition from "../animations/text-appearing-from-bottom-transition";
// import * as from '../../assets/sun-images/'
import defaultImage from "../../assets/sun-images/image1.jpg";
export default function SpinningSunContainer({ scrollPosition }) {
  const images = require.context("../../assets/sun-images/", true);
  const [imgSrcIteration, setImgSrcIteration] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [sunImage, setSunImage] = useState(images("./" + `image${1}.jpg`));
  // images.forEach(image => (new Image().src = image.src));
  console.log(images)
  let amountOfImages = 200;
  const ref = useRef();

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 100000;
  };

  let sectionEnding = getOffset() + 1500;
  let sectionBeggining = getOffset();

  function fetchPreviousSunImage() {
    if (imgSrcIteration > 1 && imgSrcIteration <= amountOfImages) {
      setImgSrcIteration(imgSrcIteration - 1);
      setSunImage(images("./" + `image${imgSrcIteration}.jpg`));
    }
  }

  function fetchNewSunImage() {
    if (imgSrcIteration >= 1 && imgSrcIteration < amountOfImages) {
      setImgSrcIteration(imgSrcIteration + 1);
      setSunImage(images("./" + `image${imgSrcIteration}.jpg`));
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
    if (isWithinBoundaries() && isScrollingUp()) {
      fetchPreviousSunImage();
    } else if (isWithinBoundaries() && isScrollingDown()) {
      fetchNewSunImage();
    }
    setPrevScrollPosition(scrollPosition);
  }, [scrollPosition, prevScrollPosition]);

  return (
    <div ref={ref} style={{ height: 3000 }}>
      <img
        src={sunImage}
        style={{ width: "100%", position: "sticky", top: 0 }}
        alt="spinning sun"
      />
      {/* <h1 style={{zIndex:100, position:'absolute', color: "white",
       transform: `translate(300%,${sectionBeggining}px)`  }}> SUN FLARES</h1> */}
    </div>
  );
}

// function showOldSun() {
//   const newState = Object.assign({}, sunStyle)
//   newState.transition = "opacity 1s"
//   newState.opacity = "1"
//   setSunStyle(newState)
// }

// let [spinningSunStyle, setSpinningSunStyle] = useState({
//   position: "fixed",
//   left: "20%",
//   top: "8%",
//   maxHeight: "100vh",
//   margin: 0,
//   maxWidth: "100vh",
//   // display: 'none',
//   // transform: `translate(50%, -50%)`,
//   zIndex: 1,
// })

// function hideOldSun() {
//   const newState = Object.assign({}, sunStyle)
//   newState.opacity = "0"
//   newState.transition = "opacity 1s"
//   setSunStyle(newState) //
// }

// function setHideSpinningSunStyle() {
//   const newState = Object.assign({}, spinningSunStyle)
//   // if (newState.opacity == 0) {
//   newState.transition = "opacity 1s"
//   newState.opacity = "0"
//   setSpinningSunStyle(newState)
//   // }
// }

// function setShowSpinningSunStyle() {
//   const newState = Object.assign({}, spinningSunStyle)
//   // if (newState.opacity == 0) {
//   newState.transition = "opacity 1s"
//   newState.opacity = "1"
//   setSpinningSunStyle(newState)
//   // }
// }
