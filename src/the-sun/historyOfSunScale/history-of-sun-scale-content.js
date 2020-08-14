import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3" //

export default function HistoryOfSunScaleContent({
  sectionBeggining,
  scrollPosition,
  xScale,
}) {
  const [imageStyle, setImageStyle] = useState({
    position: "fixed",
    minHeight: "100%",
    minWidth: "1024px",
    width: "100%",
    height: "auto",
    // opacity:0.5,
    top: 0,
    zIndex:-100,
    left: 0,
  })

  const [image, setImage] = useState("black")

  const [mainTextStyle, setMainTextStyle] = useState({
    position: "fixed",
    top: "35%",
    left: "20%",
    fontSize: "25px",
    textAlign:'left',
    zIndex: 0,
    width: "30rem",
    opacity: 0,
  })
  const [mainText, setMainText] = useState("")
  let firstSection
  const opacityScaleImage = d3.scaleLinear().domain([0, 400]).range([0, 0.5])
  const opacityScaleText = d3.scaleLinear().domain([0, 400]).range([0, 1])

  useEffect(() => {
    firstSection = sectionBeggining + xScale(1)
    if (scrollPosition < sectionBeggining) {
      const newState = Object.assign({}, mainTextStyle)
      newState.opacity = 0
      const imageState = Object.assign({}, imageStyle)
      imageState.opacity = 0
      setImageStyle(imageState)
      setMainTextStyle(newState)
    } else if (
      scrollPosition >= sectionBeggining &&
      scrollPosition < firstSection
    ) {
      var pos = (scrollPosition - sectionBeggining) / 1000 + 0.7
      if (pos < 1) pos = 1

      const newState = Object.assign({}, mainTextStyle)

      const imageState = Object.assign({}, imageStyle)
      imageState.transform = `scale(${pos})`
      if (scrollPosition - sectionBeggining < 400) {
        var opacity = sectionBeggining - scrollPosition
        imageState.opacity = -opacityScaleImage(opacity)
        newState.opacity = -opacityScaleText(opacity)
      }
      if (firstSection - scrollPosition < 400) {
        var opacity = firstSection - scrollPosition

        imageState.opacity = opacityScaleImage(opacity)
        newState.opacity = opacityScaleText(opacity)
      }
      setMainText(
        "From the cosmic soup the sun was born. Gas and dust contracted into a giant cloud, then floated in one of the spiral arms of the Milky Way."
      )
      setMainTextStyle(newState)

      setImage(
        "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/06/a_stormy_stellar_nursery/17005259-1-eng-GB/A_stormy_stellar_nursery_pillars.jpg"
      )
      setImageStyle(imageState)
    } else if (scrollPosition > firstSection) {
      const newState = Object.assign({}, mainTextStyle)
      newState.opacity = 0

      const imageState = Object.assign({}, imageStyle)
      imageState.opacity = 0

      setMainTextStyle(newState)
      setImageStyle(imageState)
    }
  }, [scrollPosition])

  return (
    <div style={{ height: firstSection - sectionBeggining }}>
      <img style={imageStyle} src={image}></img>
      <div style={mainTextStyle}>
        <h1 style={{ color: "lightgray" }}>Stellar Nursery</h1>
        <p style={{ color: "lightgray" }}>{mainText}</p>
      </div>
    </div>
  )
}
