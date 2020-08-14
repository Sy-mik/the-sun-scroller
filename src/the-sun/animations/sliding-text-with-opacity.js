import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3" //

export default function SlidingTextWithOpacity({
  headerText,
  text,
  fontSize,
  opacity,
  style: fontStyle,
  headerColor,
  color,
  containerStyle,
  marginTop,
}) {
  return (
    <div style={{ ...containerStyle, marginTop: marginTop ?? 0 + "px" }}>
      {/* <div style={{ marginBottom: marginBottom }}> */}
      <h1
        style={{
          zIndex:100,
          color: headerColor ?? "lightgray",
          fontSize: fontSize ?? 40,
          fontWeight: 600,
          zIndex: 100,
          opacity: opacity,
          fontStyle: fontStyle,
        }}
      >
        {headerText}
      </h1>
      <p
        style={{
          zIndex:100,
          color: color ?? "darkgray",
          fontSize: (3 / 5) * fontSize ?? 20,
          fontWeight: 600,
          zIndex: 100,
          opacity: opacity,
          fontStyle: fontStyle,
        }}
      >
        {text}
      </p>
    </div>
    // </div>
  )
}
