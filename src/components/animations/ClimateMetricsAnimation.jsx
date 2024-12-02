// src/components/animations/ClimateMetricsAnimation.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ClimateMetricsAnimation = () => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const margin = { top: 40, right: 30, bottom: 60, left: 50 };

      // Clear previous content
      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Add a subtle gradient background
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "background-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#f0f9ff");

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#e0f2fe");

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "url(#background-gradient)");

      const metrics = [
        { name: "Temperature", value: 75, color: "#FF8300", icon: "🌡️" },
        { name: "Rainfall", value: 60, color: "#02C650", icon: "🌧️" },
        { name: "Sea Level", value: 45, color: "#2351DC", icon: "🌊" },
        { name: "Air Quality", value: 85, color: "#FFCD00", icon: "💨" },
        { name: "Green Cover", value: 55, color: "#A9DE00", icon: "🌿" }
      ];

      const xScale = d3.scaleBand()
        .domain(metrics.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Add animated grid lines
      const gridGroup = svg.append("g")
        .attr("class", "grid-lines");

      d3.range(0, 101, 20).forEach(y => {
        gridGroup.append("line")
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
          .attr("y1", yScale(y))
          .attr("y2", yScale(y))
          .attr("stroke", "#e5e7eb")
          .attr("stroke-dasharray", "4,4")
          .attr("opacity", 0)
          .transition()
          .duration(1000)
          .delay(y * 20)
          .attr("opacity", 0.5);
      });

      // Add Y axis with animation
      const yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickSize(0))
        .style("opacity", 0);

      yAxis.transition()
        .duration(1000)
        .style("opacity", 1);

      yAxis.selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#666");

      // Add bars with enhanced animations
      const bars = svg.selectAll("rect.bar")
        .data(metrics)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.name))
        .attr("y", height - margin.bottom)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("rx", 6)
        .style("fill", d => d.color)
        .style("opacity", 0.8)
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration(300)
            .style("opacity", 1)
            .attr("transform", "scale(1.05)");
        })
        .on("mouseout", function(event, d) {
          d3.select(this)
            .transition()
            .duration(300)
            .style("opacity", 0.8)
            .attr("transform", "scale(1)");
        });

      // Animate bars
      bars.transition()
        .duration(1500)
        .delay((d, i) => i * 200)
        .attr("y", d => yScale(d.value))
        .attr("height", d => height - margin.bottom - yScale(d.value));

      // Add labels and icons with animations
      const labels = svg.selectAll(".label-group")
        .data(metrics)
        .enter()
        .append("g")
        .attr("class", "label-group")
        .attr("transform", d => `translate(${xScale(d.name) + xScale.bandwidth() / 2}, ${height - margin.bottom + 20})`);

      // Add icons
      labels.append("text")
        .attr("class", "icon")
        .attr("text-anchor", "middle")
        .attr("dy", "0em")
        .style("font-size", "20px")
        .style("opacity", 0)
        .text(d => d.icon)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 1000)
        .style("opacity", 1);

      // Add metric names
      labels.append("text")
        .attr("class", "name")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .style("font-size", "12px")
        .style("fill", "#666")
        .style("opacity", 0)
        .text(d => d.name)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 1000)
        .style("opacity", 1);

      // Add floating particles
      function createParticle() {
        const metric = metrics[Math.floor(Math.random() * metrics.length)];
        const x = xScale(metric.name) + Math.random() * xScale.bandwidth();
        const startY = height - margin.bottom;
        const endY = yScale(metric.value);

        svg.append("circle")
          .attr("cx", x)
          .attr("cy", startY)
          .attr("r", Math.random() * 3 + 1)
          .style("fill", metric.color)
          .style("opacity", 0.6)
          .transition()
          .duration(2000)
          .ease(d3.easeQuadOut)
          .attr("cy", endY)
          .style("opacity", 0)
          .remove();
      }

      const particleInterval = setInterval(createParticle, 200);

      // Cleanup
      return () => clearInterval(particleInterval);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-4">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};