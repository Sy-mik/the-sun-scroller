import * as d3 from "d3";
import { planets } from "./Planets";

export function DrawGraph({ scale, w, svgHeight, x, y }) {
  var svg = d3
    .select("#solarSystemGraph")
    .insert("svg")
    .attr("width", w)
    .attr("height", 13 * svgHeight); //change to 10* if you want to show the real one

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
    });

  d3.select("#solarSystemGraph")
    .style("position", "sticky")
    .style("height", svgHeight)
    .style("top", 0);

  return svg;
}
