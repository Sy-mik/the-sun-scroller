import React, { useState, useEffect, useRef } from "react"
import { useSpring, animated } from "react-spring"
import sunStyles from "./the-sun.css"
import SuperBigHeaderComponent from "./SuperBigHeaderComponent"
import TextAppearingFromBottomTransition from "./animations/text-appearing-from-bottom-transition"

export default function SpinningSunContainer({
  scrollPosition,
  sunStyle,
  setSunStyle,
  sectionBeggining,
  sectionEnding,
  setSunImage,
}) {

  const images = require.context("../../public/assets/sun-images/", true)
  const [imgSrcIteration, setImgSrcIteration] = useState(1)
  const [prevScrollPosition, setPrevScrollPosition] = useState(0)
  let amountOfImages = 200

  function fetchPreviousSunImage() {
    if (imgSrcIteration > 1 && imgSrcIteration <= amountOfImages) {
      setImgSrcIteration(imgSrcIteration - 1)
      setSunImage(images("./" + `image${imgSrcIteration}.jpg`))
    }
  }

  function fetchNewSunImage() {
    if (imgSrcIteration >= 1 && imgSrcIteration < amountOfImages) {
      setImgSrcIteration(imgSrcIteration + 1)
      setSunImage(images("./" + `image${imgSrcIteration}.jpg`))
    }
  }

  function isWithinBoundaries() {
    return scrollPosition > sectionBeggining && scrollPosition < sectionEnding
  }

  function isScrollingUp() {
    return prevScrollPosition > scrollPosition
  }

  function isScrollingDown() {
    return prevScrollPosition < scrollPosition
  }

  useEffect(() => {
    if (isWithinBoundaries() && isScrollingUp()) {
      fetchPreviousSunImage()
    } else if (isWithinBoundaries() && isScrollingDown()) {
      fetchNewSunImage()
    }
    setPrevScrollPosition(scrollPosition)
  }, [scrollPosition, prevScrollPosition])

  return (
    <div>
      {/* <h1 style={{zIndex:100, position:'absolute', color: "white",
       transform: `translate(300%,${sectionBeggining}px)`  }}> SUN FLARES</h1> */}
    </div>
  )
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
