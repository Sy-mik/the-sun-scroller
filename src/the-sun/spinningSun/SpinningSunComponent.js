import React, { useState, useEffect, useRef } from "react";
import { ismobile } from "react-device-detect";
import * as d3 from "d3";
export default function SpinningSunComponent({
  scrollPosition,
  innerHeight,
  innerWidth,
  sunImage,
  ending,
}) {
  return (
    <div >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            zIndex: 100,
            color: "white",
            margin: 100,
            fontSize: 50,
          }}
        >
          SUN FLARES
        </h1>
      </div>
      <div>
        <img
          src={sunImage}
          style={{
            width: ismobile ? innerHeight / 2 : innerWidth / 2,
            // marginLeft:"20%",
            position: "sticky",
            display: "inline",
            top: "20%",
          }}
          alt="spinning sun"
        />
        <div
          style={{
            marginLeft: ismobile ? innerHeight / 2 : innerWidth / 2,
            marginTop: ismobile ? -innerWidth / 4 : -innerHeight / 4,
          }}
        >
          <p
            style={{
              color: "lightgray",
              maxWidth: "25rem",
            }}
          >
            A solar flare is a sudden flash of increased brightness on the Sun,
            usually observed near its surface and in close proximity to a
            sunspot group. Powerful flares are often, but not always,
            accompanied by a coronal mass ejection. Even the most powerful
            flares are barely detectable in the total solar irradiance (the
            "solar constant").
          </p>

          <p
            style={{
              color: "lightgray",
              maxWidth: "25rem",
            }}
          >
            Flares are closely associated with the ejection of plasmas and
            particles through the Sun's corona into outer space; flares also
            copiously emit radio waves. If the ejection is in the direction of
            the Earth, particles associated with this disturbance can penetrate
            into the upper atmosphere (the ionosphere) and cause bright auroras,
            and may even disrupt long range radio communication. It usually
            takes days for the solar plasma ejecta to reach Earth. Flares also
            occur on other stars, where the term stellar flare applies.
            High-energy particles, which may be relativistic, can arrive almost
            simultaneously with the electromagnetic radiations.{" "}
          </p>
          <p
            style={{
              color: "lightgray",
              maxWidth: "25rem",
            }}
          >
            Flares occur when accelerated charged particles, mainly electrons,
            interact with the plasma medium. Evidence suggests that the
            phenomenon of magnetic reconnection leads to this copious
            acceleration of charged particles.[5] On the Sun, magnetic
            reconnection may happen on solar arcades – a series of closely
            occurring loops following magnetic lines of force. These lines of
            force quickly reconnect into a lower arcade of loops leaving a helix
            of magnetic field unconnected to the rest of the arcade. The sudden
            release of energy in this reconnection is the origin of the particle
            acceleration. The unconnected magnetic helical field and the
            material that it contains may violently expand outwards forming a
            coronal mass ejection.[6] This also explains why solar flares
            typically erupt from active regions on the Sun where magnetic fields
            are much stronger.
          </p>
        </div>
      </div>
    </div>
  );
}
