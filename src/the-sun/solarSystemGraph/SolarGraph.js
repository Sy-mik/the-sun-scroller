import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./solarSystemGraph.css";
import { isMobile } from "react-device-detect";
import { DrawGraph } from "./DrawGraph";
import { DrawRealSizeGraph } from "./DrawRealSizeGraph";
import { DrawSimplifiedSizeGraph } from "./DrawSimplifiedSizeGraph";
export default function DrawSolarGraph({
  innerHeight,
  innerWidth,
  drawRealSizeGraph,
}) {
  // establish variables
  var w = innerWidth;
  const sizeMulitplier = 25;
  const animationDuration = 700;

  const sunSize = 696000;
  const realScale = d3
    .scaleLinear()
    .domain([0, 1437000000])
    .range([0, sizeMulitplier * innerHeight]);

  const PlanetRealScaleMax = isMobile
    ? innerHeight + 1 * innerHeight
    : innerWidth + (1 / 3) * innerWidth;

  const planetRealScale = d3
    .scaleLinear()
    .domain([0, sunSize])
    .range([0, PlanetRealScaleMax]);

  const revertredPlanetScale = d3
    .scaleLinear()
    .domain([0, PlanetRealScaleMax])
    .range([0, 696000]);

  const simplifiedScale = d3
    .scaleLinear()
    .domain([0, 1437000000])
    .range([0, innerHeight - 20]);

  var svgHeight = innerHeight;
  var x = w / 2;
  var y = innerHeight / 2;
  var t0 = new Date().setHours(0, 0, 0, 0);

  // planets and moons

  useEffect(() => {
    var scale = getRealScale;

    if (drawRealSizeGraph) {
      scale = simplifiedScale;
    }

    var svg = DrawGraph({ scale, w, svgHeight, x, y });

    if (drawRealSizeGraph) {
      DrawRealSizeGraph({
        svg,
        animationDuration,
        getRealScale,
        planetRealScale,
        sunSize,
        w,
        t0,
        revertredPlanetScale,
        realScale,
      });
    } else {
      DrawSimplifiedSizeGraph({
        svg,
        animationDuration,
        simplifiedScale,
        sunSize,
        svgHeight,
      });
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

  function getRealScale(value) {
    return realScale(value) + planetRealScale(sunSize);
  }

  return (
    <div style={{}}>
      <div id="solarSystemGraph"></div>
      <div style={{ height: 1800, width: 0 }}></div>
    </div>
  );
}
