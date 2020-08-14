import React from "react"
import { useSpring, animated } from "react-spring"

export default function SuperBigHeaderComponent() {
  return (
    <div style={{ textAlign: "center",paddingTop:'10%', paddingLeft:'15%', paddingRight:'15%' }}>
      <h1 style={{ color: "lightgray", fontSize: 40, zIndex: 100 }}>The sun</h1>
      <h1 className="sun-gradient" style={{ color: "white", fontSize: 50}}>
          Learn About The Hottest Single In The Solar System
         {/* Power of 6840000000000000000000000000 Lumens */}
      </h1>
    </div>
  )
}
