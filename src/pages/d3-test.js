import * as d3 from 'd3';
import { default as React, useRef, useEffect } from 'react';
import Layout from '../components/layout';

// https://wattenberger.com/blog/react-and-d3

const dimensions = {
  width: 960,
  height: 600,
  margin: { top: 30, right: 60, bottom: 30, left: 60 }
};

const PotentialMembraneDynamicsD3 = () => {

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  const W = [0.3, -0.4, 0.5, 0.7, 0.5, 0.8];
  const T = [1, 8, 12, 15, 17, 18];
  const tau = 1;
  
  function Vmem(t) {
    let v = 0;
    for (let i = 0; i < W.length; ++i) {
      if (T[i] <= t) {
        v += W[i] * (t - T[i]) * Math.exp(tau * (T[i] - t))
      }
    }
    return v;
  }

  const svgRef = useRef();
  useEffect(() => {
    const xScale = d3.scaleLinear()
      .domain([0, 20])
      .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
      .domain([-0.2, 0.6])
      .range([height - margin.bottom, margin.top]);
    
      // Create root container where we will append all other chart elements
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgElement

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .call(g => g.select(".tick:first-of-type text"));

    svg.append("g")
        .attr("transform", `translate(${margin.left - 12},0)`)
        .call(d3.axisLeft(yScale).ticks(8))
        .call(g => g.select(".domain"));

    T.forEach(value => {
      svg.append("line")
        .attr("x1", xScale(value))
        .attr("y1", -margin.bottom - margin.top)
        .attr("x2", xScale(value))
        .attr("y2", height - margin.top)
        .style("stroke-width", 1)
        .style("stroke", "#008148")
        .style("fill", "none")

    })

    // threshold
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", yScale(0.5))
      .attr("x2", width - margin.right)
      .attr("y2", yScale(0.5))
      .style("stroke-width", 1.4)
      .style("stroke", "#F25F5C")
      .style("fill", "none")
    svg.append("line")
      .attr("x1", xScale(18.64))
      .attr("y1", -margin.bottom - margin.top)
      .attr("x2", xScale(18.64))
      .attr("y2", height - margin.top)
      .style("stroke-width", 1.4)
      .style("stroke", "#F25F5C")
      .style("fill", "none")
    
    const pathX = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "#247BA0")
        .attr("stroke-width", 1.5);

    const n = 20 * 10;
    const X = new Float64Array(n);
    const Y = new Float64Array(n);
    for (let i = 0; i < n; ++i) {
      const x = 0 + (i / n) * (20 - 0);
      X[i] = x;
      Y[i] = Vmem(x);
    }
    
    pathX.attr("d", d3.line()
      .x(xScale)
      .y((_, i) => yScale(Y[i]))(X)
    );

  }, []);
  
  return (
    <Layout 
      title="Potential Membrane Dynamics"
      bannerParagraph={[<h1 key="1">Potential Membrane Dynamics with d3.js</h1>]}
    >
      <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </Layout>
  )
};

export default PotentialMembraneDynamicsD3;
