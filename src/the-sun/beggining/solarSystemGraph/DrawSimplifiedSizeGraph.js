import * as d3 from "d3";
import { planets } from "./Planets";
import wrap from "../../wrapText";
import { constants } from "../../../constants";

export function DrawSimplifiedSizeGraph({
  svg,
  animationDuration,
  simplifiedScale,
  sunSize,
  svgHeight,
}) {
  svg
    .append("text")
    .text(
      `Altough space between the planets on the graph is accurate, it doesn't represent how much bigger the sun is.`
    )
    .attr("x", "50%")
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "start")

    .attr("font-size", 20)
    .attr("fill", "lightgray")
    .attr("color", "lightgray")
    .call(wrap, constants.defaultWrapTextWidth)
    .style("opacity", 0)
    .transition()
    .duration(animationDuration)
    .style("opacity", 1);

  planets.forEach((planet) => {
    d3.select("#orbit_" + planet.name)
      .transition()
      .duration(animationDuration) // miliseconds
      .attr("shape-rendering", "geometricPrecision")
      .attr("r", function () {
        if (simplifiedScale(planet.R) < 0) {
          return 0;
        }
        return simplifiedScale(planet.R);
      });

    d3.select("#sun")
      .transition()
      .duration(animationDuration) // miliseconds
      .attr("r", function () {
        if (simplifiedScale(30 * sunSize) < 0) {
          return 0;
        }
        return simplifiedScale(30 * sunSize);
      })

      .style("height", svgHeight);

    d3.select("#" + planet.name)
      .transition()
      .duration(animationDuration) // miliseconds
      .attr("cx", simplifiedScale(planet.R))
      .attr("r", function () {
        if (simplifiedScale(planet.r) < 0) {
          return 0;
        }
        return planet.r;
      });
  });
}
