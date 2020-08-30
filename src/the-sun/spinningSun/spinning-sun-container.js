import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import SuperBigHeaderComponent from "../beggining/SuperBigHeaderComponent";
import TextAppearingFromBottomTransition from "../animations/text-appearing-from-bottom-transition";
// import * as from '../../assets/sun-images/'
import defaultImage from "../../assets/sun-images/image1.jpg";
import { ismobile } from "react-device-detect";
import * as d3 from "d3";
export default function SpinningSunContainer({
  scrollPosition,
  innerHeight,
  innerWidth,
}) {
  const images = require.context("../../assets/sun-images/", true);
  const [imgSrcIteration, setImgSrcIteration] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [sunImage, setSunImage] = useState(images("./" + `image${1}.jpg`));
  // images.forEach(image => (new Image().src = image.src));
  const preloadedImages = useRef([]);
  let height = 2 * innerHeight;
  const scrollScale = d3
    .scaleLinear()
    .domain([0, (1 / 2) * height])
    .range([0, 200]);
  let amountOfImages = 200;
  const ref = useRef();

  const getOffset = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    } else return 0;
  };

  let sectionEnding = getOffset() + 1500;

  function fetchPreviousSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration <= amountOfImages) {
      // setImgSrcIteration(imgSrcIteration - 1);
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));
      if (
        preloadedImages.current[imgSrcIteration] &&
        preloadedImages.current[imgSrcIteration].src
      ) {
        setSunImage(preloadedImages.current[imgSrcIteration].src);
      }
    }
  }

  function fetchNewSunImage() {
    if (imgSrcIteration >= 0 && imgSrcIteration < amountOfImages - 1) {
      setImgSrcIteration(parseInt(scrollScale(scrollPosition - getOffset())));

      if (
        preloadedImages.current[imgSrcIteration] &&
        preloadedImages.current[imgSrcIteration].src
      ) {
        setSunImage(preloadedImages.current[imgSrcIteration].src);
      }
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
        <div style={{ position: "sticky", top: "20%" }}>
          <img
            src={sunImage}
            style={{
              width: ismobile ? innerHeight / 2 : innerWidth / 2,
              // marginLeft:"20%",
            }}
            alt="spinning sun"
          />
        </div>
        <div
          style={{
            marginLeft: ismobile ? innerHeight / 2 : innerWidth / 2,
            marginTop: ismobile ? -innerWidth / 2 : -innerHeight / 2,
          }}
        >
          <p
            style={{
              color: "lightgray",
              maxWidth: "30rem",
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
              maxWidth: "30rem",
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
              maxWidth: "30rem",
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

      <div style={{ height: 2000 }}></div>
    </div>
  );
}
