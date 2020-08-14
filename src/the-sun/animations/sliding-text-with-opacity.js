import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3" //

export default function SlidingTextWithOpacity({
  headerText,
  text,
  fontSize,
  opacity,
  style,
  headerColor,
  color,
  containerStyle,
  marginTop,
  marginBottom,
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
          fontStyle: style,
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
          fontStyle: style,
        }}
      >
        {text}
      </p>
    </div>
    // </div>
  )
}
