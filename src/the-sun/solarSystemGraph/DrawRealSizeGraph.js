import { planets } from "./Planets";
import * as d3 from "d3";
import wrap from "../wrapText";
import { constants } from "../../constants";

export function DrawRealSizeGraph({
  svg,
  animationDuration,
  getRealScale,
  planetRealScale,
  sunSize,
  w,
  t0,
  revertredPlanetScale,
  realScale,
}) {
  planets.forEach((planet, index) => {
    var parentNode = d3.select("#" + planet.name);
    var g = parentNode.select(function () {
      return this.parentNode;
    });

    d3.select("#orbit_" + planet.name)
      .transition()
      .duration(animationDuration) // miliseconds
      .attr("r", getRealScale(planet.realSizeR));

    g.append("svg:image")
      .attr("xlink:href", function () {
        return planet.iconpath;
      })
      .attr("x", 0)
      .attr("y", getRealScale(planet.realSizeR))
      .attr("width", 2 * planetRealScale(planet.realSizer))
      .attr(
        "transform",
        `translate(-${planetRealScale(planet.realSizer)},-${planetRealScale(
          planet.realSizer
        )})`
      )
      .attr("height", 2 * planetRealScale(planet.realSizer))
      .attr("id", "icon_" + planet.name);

    g.selectAll("g.moon")
      .data(planet.moons)
      .enter()
      .append("g")
      .attr("class", "moon_cluster")
      .attr(
        "transform",
        `translate(-${planetRealScale(0)},${getRealScale(planet.realSizeR)})`
      )
      .each(function (d, i) {
        d3.select(this)
          .append("circle")
          .attr("class", "moonOrbit")
          .attr("r", planetRealScale(planet.realSizer) + d.R);
        d3.select(this)
          .append("circle")
          .attr("r", d.r)
          .attr("cx", planetRealScale(planet.realSizer) + d.R)
          .attr("cy", 0)
          .attr("class", "moon");
      });

    d3.select("#sun")
      .transition()
      .duration(animationDuration) // miliseconds
      .attr("r", planetRealScale(sunSize));

    d3.select("#" + planet.name)
      .style("opacity", 0);

    var info = svg.append("g");
    info
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
      .attr("fill", "lightgray")
      .call(wrap, constants.defaultWrapHeaderWidth);

    info
      .append("text")
      .text(`${planet.realSizeR / 1000000} million km from the sun`)
      .attr("x", w / 2)
      .attr("y", getRealScale(planet.realSizeR) + 40)
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .attr("font-weight", 400)
      .attr("fill", "lightgray")
      .attr("color", "lightgray")
      .call(wrap, constants.defaultWrapHeaderWidth + 100);
    info
      .append("text")
      .text(
        `${new Intl.NumberFormat().format(
          planet.realSizer
        )}km diamater (1/${parseInt(sunSize / planet.realSizer)} of the sun)`
      )
      .attr("x", w / 2)
      .attr("y", getRealScale(planet.realSizeR) + 2 * 40)
      .attr("text-anchor", "middle")
      .attr("font-size", constants.smallerFontSize)
      .attr("fill", "lightgray")
      .attr("color", "lightgray")
      .call(wrap, constants.defaultWrapHeaderWidth);
  });

  setInterval(function () {
    var delta = Date.now() - t0;
    svg.selectAll(".moon").attr("transform", function (d) {
      return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
    });
  }, 40);

  svg
    .append("text")
    .text(`One pixel of a planet is ${parseInt(revertredPlanetScale(1) / 2)}km`)
    .attr("x", w / 2)
    .attr("y", getRealScale(sunSize) + 50) //1.5)
    .attr("text-anchor", "middle")
    .attr("font-size", 30)
    .attr("fill", "white")
    .style("opacity", 0)
    .attr("width", "20")
    .transition()
    .duration(animationDuration)
    .style("opacity", 1)
    .call(wrap, constants.defaultWrapHeaderWidth);

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
    .text(`${new Intl.NumberFormat().format(sunSize)}km diameter`)
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

  const additionalInfoOffset = 3 * 55;
  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", getRealScale(planets[2].realSizeR) + additionalInfoOffset) //1.5)
    .attr("text-anchor", "middle")
    .attr("font-size", constants.smallHeaderOnMobile)
    .attr("fill", "darkgray")
    .text(
      "Light takes about 8.3 minutes to reach Earth from the surface of the Sun"
    )
    .call(wrap, constants.defaultWrapHeaderWidth);

  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", getRealScale(planets[3].realSizeR) + additionalInfoOffset) //1.5)
    .attr("text-anchor", "middle")
    .attr("font-size", constants.smallHeaderOnMobile)
    .attr("fill", "darkgray")
    .text(
      "Mars is home to the tallest mountain in the solar system." +
        " It is 21km high and 600km in diameter."
    )
    .call(wrap, constants.defaultWrapHeaderWidth);
}
