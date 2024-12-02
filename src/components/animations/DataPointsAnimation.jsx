import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DataPointsAnimation = () => {
  const containerRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Create irregular city boundary using D3's line generator
    const generateCityBoundary = () => {
      const points = [];
      const numPoints = 40;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        // Add randomness to radius for irregular shape
        const radius = maxRadius * (0.8 + Math.random() * 0.4);
        points.push([
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        ]);
      }

      points.push(points[0]); // Close the path

      return d3.line()
        .curve(d3.curveCatmullRomClosed)
        .x(d => d[0])
        .y(d => d[1])(points);
    };

    // Generate organic-looking streets
    const generateOrganicStreets = () => {
      const streets = [];
      const numStreets = 15;

      // Radial streets
      for (let i = 0; i < numStreets; i++) {
        const angle = (i / numStreets) * 2 * Math.PI;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;

        // Create curved paths using control points
        const controlPoints = [
          [centerX, centerY],
          [
            centerX + radius * 0.5 * Math.cos(angle + Math.random() * 0.2),
            centerY + radius * 0.5 * Math.sin(angle + Math.random() * 0.2)
          ],
          [
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
          ]
        ];

        streets.push({
          path: d3.line().curve(d3.curveBasis)(controlPoints),
          delay: i * 200
        });
      }

      // Circular connecting streets
      for (let r = 1; r <= 3; r++) {
        const radius = (Math.min(width, height) * 0.4) * (r / 3);
        const circlePoints = [];
        for (let i = 0; i <= 360; i += 5) {
          const angle = (i * Math.PI) / 180;
          circlePoints.push([
            width/2 + radius * Math.cos(angle) + (Math.random() - 0.5) * 20,
            height/2 + radius * Math.sin(angle) + (Math.random() - 0.5) * 20
          ]);
        }
        streets.push({
          path: d3.line().curve(d3.curveCatmullRomClosed)(circlePoints),
          delay: numStreets * 200 + r * 300
        });
      }

      return streets;
    };

    // Draw city boundary
    const boundary = svg.append('path')
      .attr('d', generateCityBoundary())
      .attr('fill', 'none')
      .attr('stroke', '#2351DC')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(2000)
      .attr('opacity', 0.3);

    // Draw streets with animation
    const streets = generateOrganicStreets();
    streets.forEach(street => {
      svg.append('path')
        .attr('d', street.path)
        .attr('fill', 'none')
        .attr('stroke', '#2351DC')
        .attr('stroke-width', 1)
        .attr('opacity', 0)
        .transition()
        .delay(street.delay)
        .duration(1500)
        .attr('opacity', 0.2);
    });

    // Add moving points
    const points = Array.from({ length: 30 }, () => ({
      x: width/2 + (Math.random() - 0.5) * width * 0.6,
      y: height/2 + (Math.random() - 0.5) * height * 0.6,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      color: d3.interpolateBlues(Math.random())
    }));

    const updateLines = () => {
      const lines = [];
      points.forEach((point, i) => {
        points.slice(i + 1).forEach(otherPoint => {
          const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
          if (distance < 100) {
            lines.push({
              x1: point.x,
              y1: point.y,
              x2: otherPoint.x,
              y2: otherPoint.y,
              opacity: 1 - (distance / 100)
            });
          }
        });
      });

      svg.selectAll('.connection')
        .data(lines)
        .join('line')
        .attr('class', 'connection')
        .attr('x1', d => d.x1)
        .attr('y1', d => d.y1)
        .attr('x2', d => d.x2)
        .attr('y2', d => d.y2)
        .attr('stroke', '#2351DC')
        .attr('stroke-width', 0.5)
        .attr('opacity', d => d.opacity * 0.3);
    };

    const animate = () => {
      points.forEach(point => {
        point.x += point.speedX;
        point.y += point.speedY;

        // Bounce off boundaries with more organic feeling
        const distanceFromCenter = Math.hypot(point.x - width/2, point.y - height/2);
        if (distanceFromCenter > Math.min(width, height) * 0.35) {
          const angle = Math.atan2(point.y - height/2, point.x - width/2);
          point.speedX -= Math.cos(angle) * 0.03;
          point.speedY -= Math.sin(angle) * 0.03;
          // Add some friction
          point.speedX *= 0.99;
          point.speedY *= 0.99;
        }
      });

      svg.selectAll('.point')
        .data(points)
        .join('circle')
        .attr('class', 'point')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.size)
        .attr('fill', d => d.color)
        .attr('opacity', 0.6);

      updateLines();
      requestAnimationFrame(animate);
    };

    // Start animation after boundary and streets are drawn
    setTimeout(animate, 3000);

    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default DataPointsAnimation;