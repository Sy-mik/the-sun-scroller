import * as d3 from "d3";
export default function drawGraph(scale, sizeMulitplier, w, svgHeight, x, y, delta, planets) {
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
        .attr("transform", "translate(" + scale(d.R) + ",0)")
        .selectAll("g.moon")
        .data(d.moons)
        .enter()
        .append("g")
        .attr("class", "moon_cluster")
        .each(function (d, i) {
          d3.select(this).append("circle").attr("class", "orbit").attr("r", 20);
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
