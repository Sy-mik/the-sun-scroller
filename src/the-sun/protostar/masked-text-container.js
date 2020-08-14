import React, { useState, useEffect, useRef } from "react";
import "./maskedText.css";
export default function MaskedTextContainer({}) {
  return (
    <div>
      <div>
        <img
          src="https://i.pinimg.com/originals/04/96/92/0496927c2861e4682b10325d9993e683.jpg"
          style={{
            zIndex: -1,
            position: "fixed",
            minHeight: "100%",
            minWidth: "1024px",
            width: "100%",
            height: "auto",
            // opacity:0.5,
            position: "fixed",
            top: 0,
            left: 0,
          }}
          alt=""
        ></img>

        <svg
          width="100%"
          height="1280"
          style={{
            position: "sticky",
            textAlign: "center",
            left: "50%",
            top: "50%",
            zIndex: 100,
          }}
        >
          <defs style={{ zIndex: 100 }}>
            <mask id="mask" style={{ zIndex: 100 }}>
              <rect
                width="100%"
                height="100%"
                fill="#fff"
                style={{ zIndex: 100 }}
              />
              <text
                x="10%"
                y="50%"
                font-size="5em"
                letter-spacing="10"
                style={{ zIndex: 100, width: 20 }}
              >
                MEET
              </text>

              <text
                x="10%"
                y="50%"
                font-size="5em"
                letter-spacing="10"
                style={{ zIndex: 100, width: 20 }}
              >
                MEET
              </text>
              <text
                x="10%"
                y="50%"
                font-size="5em"
                letter-spacing="10"
                style={{ zIndex: 100, width: 20 }}
              >
                PROTOSTAR
              </text>
            </mask>
          </defs>
          <rect
            style={{ zIndex: 100 }}
            zIndex="100"
            width="100%"
            height="100%"
            fill="black"
            fill-opacity="1"
            mask="url(#mask)"
          />
        </svg>
      </div>
    </div>
  );
}
