import earthIcon from "../../assets/icons/earth.svg";
import jupiterIcon from "../../assets/icons/jupiter.svg";
import marsIcon from "../../assets/icons/mars.svg";
import saturnIcon from "../../assets/icons/saturn.svg";
import uranusIcon from "../../assets/icons/uranus.svg";
import mercuryIcon from "../../assets/icons/mercury.svg";
import venusIcon from "../../assets/icons/venus.svg";
import neptuneIcon from "../../assets/icons/neptune.svg";

const spaceBetweenThePlanets = 65000000;

export const planets = [
  {
    R: 57000000,
    realSizeR: spaceBetweenThePlanets,
    realSizer: 2440,
    iconpath: mercuryIcon,
    r: 2,
    speed: -1.6,
    phi0: 35,
    symbol: "☿",
    name: "mercury",
    moons: [
      // mercury
    ],
  },
  {
    R: 108000000,
    realSizeR: 2 * spaceBetweenThePlanets,
    realSizer: 6052,
    iconpath: venusIcon,
    r: 4,
    speed: -1.17,
    phi0: 185,
    symbol: "♀",
    name: "venus",
    moons: [
      // venus
    ],
  },
  {
    R: 149000000,
    realSizeR: 3 * spaceBetweenThePlanets,
    realSizer: 6371,
    iconpath: earthIcon,
    r: 4,
    speed: -1.0,
    phi0: 135,
    symbol: "♁",
    name: "earth",
    moons: [
      // earth
      { R: 22, r: 1, speed: -9.0, phi0: 15 }, // the moon
    ],
  },
  {
    R: 228000000,
    realSizeR: 4 * spaceBetweenThePlanets,
    realSizer: 3390,
    iconpath: marsIcon,
    r: 2,
    speed: -0.8,
    phi0: 235,
    symbol: "♂",
    name: "mars",
    moons: [
      // mars
      { R: 12, r: 1, speed: -3.8, phi0: 15 }, // phobos
      { R: 18, r: 1, speed: -2.8, phi0: 115 }, // deimos
    ],
  },
  {
    R: 780000000,
    realSizeR: 5 * spaceBetweenThePlanets,
    realSizer: 69911,
    iconpath: jupiterIcon,
    r: 7,
    speed: -0.43,
    phi0: 135,
    symbol: "♃",
    name: "jupiter",
    moons: [
      // jupiter
      // { R: 60, r: 2, speed: -7.7, phi0: 25 }, // io
      // { R: 2 * 36, r: 1, speed: -2.45, phi0: 95 }, // europa
      // { R: 2 * 49, r: 3, speed: -1.1, phi0: 125 }, // ganymede
      // { R: 2 * 79, r: 2, speed: -0.5, phi0: 315 }, // callisto
    ],
  },
  {
    R: 1437000000,
    realSizeR: 6 * spaceBetweenThePlanets,
    realSizer: 58232,
    iconpath: saturnIcon,
    r: 3,
    speed: -0.32,
    phi0: 260,
    symbol: "♄",
    name: "saturn",
    moons: [
      // saturn
      // { R: 28, r: 1, speed: -4.1, phi0: 120 }, // mimas
      // { R: 33, r: 1, speed: -3.9, phi0: 20 }, // enceladus
      // { R: 38, r: 1, speed: -3.6, phi0: 0 }, // tethys
      // { R: 44, r: 1, speed: -3.2, phi0: 100 }, // dione
      // { R: 58, r: 2, speed: -2.9, phi0: 300 }, // rhea
      // { R: 98, r: 5, speed: -1.3, phi0: 180 }, // titan
      // { R: 188, r: 2, speed: -0.1, phi0: 10 }, // lapetus
    ],
  },
  {
    R: 28710000000,
    realSizeR: 7 * spaceBetweenThePlanets,
    realSizer: 25362,
    iconpath: uranusIcon,
    r: 3,
    speed: -0.32,
    phi0: 260,
    symbol: "⛢",
    name: "Uranus",
    moons: [],
  },
  {
    R: 44971000000,
    realSizeR: 8 * spaceBetweenThePlanets,
    realSizer: 24622,
    iconpath: neptuneIcon,
    r: 3,
    speed: -0.32,
    phi0: 260,
    symbol: "♆",
    name: "Neptune",
    moons: [],
  },
];

