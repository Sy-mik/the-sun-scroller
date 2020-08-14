import React, { useState, useEffect } from "react"
import { Transition, animated } from "react-spring/renderprops"
import "../the-sun.css"

// export default class App extends React.PureComponent
export default function TextAppearingFromBottomTransition({
  state,
  header,
  text,
  headerFontSize,
  headerFontWeight,
  fontSize,
  fontWeight,
}) {
  return (
    <div className="reveals-main">
      <Transition
        native
        items={state}
        from={{
          position: "absolute",
          overflow: "hidden",
          height: 0,
          maxWidth:'700px'
        }}
        enter={[{ height: "auto" }]}
        leave={{ height: 0 }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={props}>
              <span
                style={{
                  color: "lightgray",
                  fontSize: headerFontSize,
                  fontWeight: headerFontWeight,
                }}
              >
                {header}
              </span>

              <p
                style={{
                  color: "lightgray",
                  fontSize: '25px',
                  fontWeight: 'normal',
                }}
              >
                {text}
              </p>
            </animated.div>
          ))
        }
      </Transition>
    </div>
  )
}

/*({
  text,
  showText,
  color,
}) {
  return (
    <div className={"reveals-main"}>
      <Transition
        native
        items={showText.show}
        from={{
          position: "absolute",
          overflow: "hidden",
          height: 0,
        }}
        enter={[{ height: "auto" }]}
        leave={{ height: 0 }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={{ showText, color: color }}>
              {text}
            </animated.div>
          ))
        }
      </Transition>
    </div>
  )
}

const imageStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  zIndex: 100,
}
*/
