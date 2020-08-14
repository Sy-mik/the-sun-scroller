import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./solarSystemGraph.css";
import planets from "./planets";
import wrap from "./wrapText";
export default function DrawSolarGraph({
  innerHeight,
  innerWidth,
  drawRealSizeGraph,
}) {
  // establish variables
  var w = innerWidth;
  const sizeMulitplier = 25;
  const animationDuration = 700;

  function getRealScale(value) {
    return realScale(value) + planetRealScale(sunSize);
  }
  let sunSize = 696000;
  let maxLengthSize = 1437000000;
  const realScale = d3
    .scaleLinear()
    .domain([0, 1437000000])
    .range([0, sizeMulitplier * innerHeight]);

  const planetRealScale = d3
    .scaleLinear()
    .domain([0, sunSize])
    .range([0, innerWidth]);

  const revertredRealScale = d3
    .scaleLinear()
    .domain([0, sizeMulitplier * innerHeight])
    .range([0, 1437000000]);

  const revertredPlanetScale = d3
    .scaleLinear()
    .domain([0, innerWidth])
    .range([0, 696000]);

  const simplifiedScale = d3
    .scaleLinear()
    .domain([1, 1437000000])
    .range([1, innerHeight - 20]);

  var svgHeight = innerHeight;
  var x = w / 2;
  var y = innerHeight / 2;
  var t0 = new Date().setHours(0, 0, 0, 0);
  var delta = Date.now() - t0;
  // planets and moons
  var planets = [
    {
      R: 57000000,
      realSizeR: 57000000,
      realSizer: 2440,
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
      realSizeR: 2 * 57000000,
      realSizer: 6052,
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
      realSizeR: 3 * 57000000,
      realSizer: 6371,
      r: 4,
      speed: -1.0,
      phi0: 135,
      symbol: "♁",
      name: "earth",
      moons: [
        // earth
        // { R:  100000, r:   1, speed: -9.00, phi0:  15 }           // the moon
      ],
    },
    {
      R: 228000000,
      realSizeR: 4 * 57000000,
      realSizer: 3390,
      r: 2,
      speed: -0.8,
      phi0: 235,
      symbol: "♂",
      name: "mars",
      moons: [
        // mars
        // { R: 12, r: 1, speed: -3.8, phi0: 15 }, // phobos
        // { R: 18, r: 1, speed: -2.8, phi0: 115 }, // deimos
      ],
    },
    {
      R: 780000000,
      realSizeR: 5 * 57000000,
      realSizer: 69911,
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
      realSizeR: 6 * 57000000,
      realSizer: 58232,
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
      realSizeR: 7 * 57000000,
      realSizer: 25362,
      r: 3,
      speed: -0.32,
      phi0: 260,
      symbol: "⛢",
      name: "Uranus",
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
      R: 44971000000,
      realSizeR: 8 * 57000000,
      realSizer: 24622,
      r: 3,
      speed: -0.32,
      phi0: 260,
      symbol: "♆",
      name: "Neptune",
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
  ];

  function drawGraph(scale) {
    var svg = d3
      .select("#solarSystemGraph")
      .insert("svg")
      .attr("width", w)
      .attr("height", (sizeMulitplier + 4) * svgHeight); //change to 10* if you want to show the real one

    // sun
    svg
      .append("circle")
      .attr("r", scale(69600))
      .attr("cx", x)
      .attr("cy", y)
      .attr("id", "sun");
    var container = svg
      .append("g")
      .attr("id", "orbit_container")
      .attr("transform", "translate(" + x + "," + y + ")");

    // draw planets and moon clusters
    container
      .selectAll("g.planet")
      .data(planets)
      .enter()
      .append("g")
      .attr("class", "planet_cluster")
      .each(function (d, i) {
        d3.select(this)
          .append("circle")
          .attr("class", "orbit")
          .attr("id", "orbit_" + d.name)
          .attr("r", scale(d.R));
        d3.select(this)
          .append("circle")
          .attr("r", d.r) //simplifiedScale(d.realSizer)) //rScale(d.r))
          .attr("cx", scale(d.R))
          .attr("cy", 0)
          .attr("class", "planet")
          .attr("id", d.name)
          .attr("color", "white");
        d3.select(this)
          .append("g")
          .attr("transform", "translate(" + getRealScale(d.R) + ",0)")
          .selectAll("g.moon")
          .data(d.moons)
          .enter()
          .append("g")
          .attr("class", "moon_cluster")
          .each(function (d, i) {
            d3.select(this)
              .append("circle")
              .attr("class", "orbit")
              .attr("r", 20);
            d3.select(this)
              .append("circle")
              .attr("r", 5)
              .attr("cx", 20)
              .attr("cy", 0)
              .attr("class", "moon");
          })
          .attr("transform", function (d) {
            return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
          });
      });
    svg
      .selectAll(".planet_cluster, .moon_cluster")
      .attr("transform", function (d) {
        return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
      });

    d3.select("#solarSystemGraph")
      .style("position", "sticky")
      .style("height", svgHeight)
      .style("top", 0);

    return svg;
  }

  useEffect(() => {
    var scale = getRealScale;

    if (drawRealSizeGraph) {
      scale = simplifiedScale;
    }

    var svg = drawGraph(scale);

    if (drawRealSizeGraph) {
      realSizeGraph(svg);

      setInterval(function () {
        var delta = Date.now() - t0;
        svg.selectAll(".moon_cluster").attr("transform", function (d) {
          return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
        });
      }, 40);
    } else {
      simplifiedSizeGraph(svg);
      setInterval(function () {
        var delta = Date.now() - t0;
        svg
          .selectAll(".planet_cluster, .moon_cluster")
          .attr("transform", function (d) {
            return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
          });
      }, 40);
    }

    return () => {
      svg.remove();
    };
  }, [drawRealSizeGraph, innerHeight, innerWidth]);
  // insert svg element

  function realSizeGraph(svg) {
    svg
      .selectAll(".planet_cluster, .moon_cluster")
      .attr("transform", function (d) {
        return "rotate(90)";
      });

    planets.forEach((planet) => {
      d3.select("#orbit_" + planet.name)
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("r", getRealScale(planet.realSizeR));

      d3.select("#sun")
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("r", planetRealScale(sunSize));

      d3.select("#" + planet.name)
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("cx", getRealScale(planet.realSizeR))
        .attr("r", planetRealScale(planet.realSizer));

      svg
        .append("text")
        .text(
          planet.name.charAt(0).toUpperCase() +
            planet.name.slice(1) +
            " " +
            planet.symbol
        )
        .attr("x", w / 2)
        .attr("y", getRealScale(planet.realSizeR))
        .attr("text-anchor", "middle")
        .attr("font-size", 40)
        .attr("font-weight", 600)
        .attr("fill", "lightgray");

      svg
        .append("text")
        .text(`${planet.realSizeR}km from the sun`)
        .attr("x", w / 2)
        .attr("y", getRealScale(planet.realSizeR) + 40)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("font-weight", 400)
        .attr("fill", "lightgray")
        .attr("color", "lightgray");
      svg
        .append("text")
        .text(`${planet.realSizer}km diamater`)
        .attr("x", w / 2)
        .attr("y", getRealScale(planet.realSizeR) + 2 * 40)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("fill", "lightgray")
        .attr("color", "lightgray");
    });

    // svg
    //   .append("text")
    //   .text(`One pixel in the space is ${parseInt(revertredRealScale(1))}km`)
    //   .attr("x", w / 2)
    //   .attr("y", getRealScale(sunSize)) //1.5)
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", 30)
    //   .attr("fill", "white")
    //   .style("opacity", 0)
    //   .attr("width", "20")
    //   .transition()
    //   .duration(1000)
    //   .style("opacity", 1);
    svg
      .append("text")
      .text(
        `One pixel of a planet is ${parseInt(revertredPlanetScale(1) / 2)}km`
      )
      .attr("x", w / 2)
      .attr("y", getRealScale(sunSize) + 50) //1.5)
      .attr("text-anchor", "middle")
      .attr("font-size", 30)
      .attr("fill", "white")
      .style("opacity", 0)
      .attr("width", "20")
      .transition()
      .duration(animationDuration)
      .style("opacity", 1);

    svg
      .append("text")
      .text(`The sun`)
      .attr("x", w / 2)
      .attr("y", realScale(planets[0].realSizeR) / 1.3) //1.5)
      .attr("text-anchor", "middle")
      .attr("font-size", 40)
      .attr("fill", "white")
      .style("opacity", 0)
      .attr("width", "20")
      .transition()
      .duration(animationDuration)
      .style("opacity", 1);

    svg
      .append("text")
      .text(`${sunSize}km diameter`)
      .attr("x", w / 2)
      .attr("y", realScale(planets[0].realSizeR) / 1.3 + 50) //1.5)
      .attr("text-anchor", "middle")
      .attr("font-size", 30)
      .attr("fill", "white")
      .style("opacity", 0)
      .attr("width", "20")
      .transition()
      .duration(animationDuration)
      .style("opacity", 1);

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", getRealScale(planets[2].realSizeR) + 3 * 50) //1.5)
      .attr("text-anchor", "middle")
      .attr("font-size", 30)
      .attr("fill", "darkgray")
      .text(
        "Light takes about 8.3 minutes to reach Earth from the surface of the Sun"
      )
      .call(wrap, 700);

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", getRealScale(planets[3].realSizeR) + 3 * 50) //1.5)
      .attr("text-anchor", "middle")
      .attr("font-size", 30)
      .attr("fill", "darkgray")
      .text(
        "Mars is home to the tallest mountain in the solar system." +
          " Olympus Mons, a shield volcano, is 21km high and 600km in diameter."
      )
      .call(wrap, 650);
  }

  function simplifiedSizeGraph() {
    d3.select("#solarSystemGraph")
      .style("position", "sticky")
      .style("top", "0");

    let svg = d3.select("svg");

    svg
      .append("text")
      .text(
        `Altough space between the planets on the graph is accure, it doesn't represent how much bigger sun is.`
      )
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", 20)
      .attr("fill", "lightgray")
      .attr("color", "lightgray")
      .call(wrap, 350);

    planets.forEach((planet) => {
      d3.select("#orbit_" + planet.name)
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("r", simplifiedScale(planet.R));

      d3.select("#sun")
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("r", simplifiedScale(30 * sunSize))

        .style("height", svgHeight);

      d3.select("#" + planet.name)
        .transition()
        .duration(animationDuration) // miliseconds
        .attr("cx", simplifiedScale(planet.R))
        .attr("r", planet.r);
    });
  }

  return (
    <div style={{}}>
      <div id="solarSystemGraph"></div>
      <div style={{ height: innerHeight * 3, width: 0 }}></div>
    </div>
  );
}

/*var planets = [
    {
      R: 57000000,
      realSizeR: 57000000,
      realSizer: 2440,
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
      realSizeR: 108000000,
      realSizer: 6052,
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
      realSizeR: 149000000,
      realSizer: 6371,
      r: 4,
      speed: -1.0,
      phi0: 135,
      symbol: "⊕",
      name: "earth",
      moons: [
        // earth
        // { R: 20, r: 2, speed: -9.0, phi0: 15 }, // the moon
      ],
    },
    {
      R: 228000000,
      realSizeR: 228000000,
      realSizer: 3390,
      r: 2,
      speed: -0.8,
      phi0: 235,
      symbol: "♂",
      name: "mars",
      moons: [
        // mars
        // { R: 12, r: 1, speed: -3.8, phi0: 15 }, // phobos
        // { R: 18, r: 1, speed: -2.8, phi0: 115 }, // deimos
      ],
    },
    {
      R: 780000000,
      realSizeR: 780000000,
      realSizer: 69911,
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
      realSizeR: 1437000000,
      realSizer: 58232,
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
  ];
  */
