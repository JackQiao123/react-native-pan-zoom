import React from 'react';
import {
  G,
  Rect,
  Path,
  Line,
} from 'react-native-svg';

import { pointsDistance, angleBetweenTwoPointsAndOrigin } from './geometry';
import Ruler from './ruler';

export default function Lines({line, layer, scene}) {

  let vertex0 = layer.vertices[line.vertices[0]];
  let vertex1 = layer.vertices[line.vertices[1]];

  if (vertex0.id === vertex1.id) return null; //avoid 0-length lines
  if (vertex0.x === vertex1.x && vertex0.y === vertex1.y) return null;

  let {x: x1, y: y1} = vertex0;
  let {x: x2, y: y2} = vertex1;

  if (x1 > x2) {
    ({x: x1, y: y1} = vertex1);
    ({x: x2, y: y2} = vertex0);
  }

  let length = pointsDistance(x1, y1, x2, y2);
  let angle = angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);
  const epsilon = 3;
  
  let renderedHoles = line.holes.map(holeID => {
    let hole = layer.holes[holeID];

    let startAt = length * hole.offset;
    let renderedHole = <G></G>;
    const holeWidth = hole.properties.width.length;
    switch (hole.type) {
      case 'window-curtain':
        const STYLE_HOLE_BASE1 = { stroke: '#000', strokeWidth: '3px', fill: 'transparent' };
        const STYLE_HOLE_SELECTED1 = {
          stroke: '#0096fd', strokeWidth: '3px', fill: 'transparent', cursor: 'move'
        };

        
        const leftPath = `M${0},${-epsilon * 2}  A${holeWidth / 4},${holeWidth / 6} 0 0,1 ${holeWidth / 6},${holeWidth / 6}`;
        const rightPath = `M${holeWidth},${-epsilon * 2}  C${holeWidth * 2 / 3},0 ${holeWidth * 5 / 6},${holeWidth / 6} ${holeWidth * 5 / 6},${holeWidth / 6}`;
        const holeStyle1 = hole.selected ? STYLE_HOLE_SELECTED1 : STYLE_HOLE_BASE1;
        const length1 = hole.properties.width.length;
        renderedHole = <G transform={`translate(${-length1 / 2}, 0)`}>
            <Rect
              key="1"
              x={0}
              y={-15}
              width={holeWidth}
              height={30}
              style={{ stroke: hole.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#4285F4' }} />
            <Line key="2" x1={holeWidth / 2} y1={-12 - epsilon} x2={holeWidth / 2} y2={12 + epsilon} style={holeStyle1} />
            <Line key="3" x1={epsilon * 5} y1={epsilon} x2={holeWidth * 4 / 5} y2={epsilon} style={holeStyle1} />
            <Path key="8" d={leftPath} style={holeStyle1} />
            <Path key="9" d={rightPath} style={holeStyle1} />
            <Line key="6" x1={0} y1={-epsilon * 2} x2={holeWidth / 8} y2={-12 - epsilon} style={holeStyle1} />
            <Line key="7" x1={holeWidth} y1={-epsilon * 2} x2={holeWidth * 7 / 8} y2={-12 - epsilon} style={holeStyle1} />
        </G>;
        break;
      case 'double-panic-door':
          const STYLE_HOLE_BASE2 = { stroke: '#ff0000', strokeWidth: '3px', fill: '#ff0000' };
          const STYLE_HOLE_SELECTED2 = {
            stroke: '#ff0000', strokeWidth: '4px', fill: '#ff0000', cursor: 'move'
          };
          const STYLE_ARC_BASE2 = {
            stroke: '#ff0000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none'
          };
          const STYLE_ARC_SELECTED2 = {
            stroke: '#ff0000', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move'
          };

          const flip = hole.properties.flip_horizontal;

          const holePath = `M${0} ${-epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
          const arcPath = `M${0},${0}  A${holeWidth / 2},${holeWidth / 2} 0 0,1 ${holeWidth / 2},${holeWidth / 2}`;
          const arcPath2 = `M${0},${0}  A${holeWidth / 2},${holeWidth / 2} 0 0,0 ${holeWidth / 2},${holeWidth / 2}`;
          const holeStyle2 = hole.selected ? STYLE_HOLE_SELECTED2 : STYLE_HOLE_BASE2;
          const arcStyle = hole.selected ? STYLE_ARC_SELECTED2 : STYLE_ARC_BASE2;
          if (flip) {
            renderedHole = <G transform={`translate(${-hole.properties.width.length / 2}, 0)`}>
              <Path key="1" d={arcPath} style={arcStyle} transform={`translate(${0},${-holeWidth / 2})`} />
              <Line key="2" x1={0} y1={0 - epsilon} x2={0} y2={-holeWidth / 2 - epsilon} style={holeStyle2} />
              <Path key="3" d={arcPath2} style={arcStyle} transform={`translate(${holeWidth},${-holeWidth / 2}) rotate(90)`} />
              <Line key="4" x1={holeWidth} y1={0 - epsilon} x2={holeWidth} y2={-holeWidth / 2 - epsilon} style={holeStyle2} />
              <Path key="5" d={holePath} style={holeStyle2} />
            </G>
          } else {
            renderedHole = <G transform={`translate(${-hole.properties.width.length / 2}, 0)`}>
              <Path key="1" d={arcPath} style={arcStyle} transform={`translate(${holeWidth},${holeWidth / 2}) rotate(180)`} />
              <Line key="2" x1={0} y1={0 - epsilon} x2={0} y2={holeWidth / 2 - epsilon} style={holeStyle2} />
              <Path key="3" d={arcPath2} style={arcStyle} transform={`translate(${0},${holeWidth / 2}) rotate(270)`} />
              <Line key="4" x1={holeWidth} y1={0 - epsilon} x2={holeWidth} y2={holeWidth / 2 - epsilon} style={holeStyle2} />
              <Path key="5" d={holePath} style={holeStyle2} />
            </G>
          }
        break;
    }

    return <G
      key={holeID}
      transform={`translate(${startAt}, 0)`}
      data-element-root
      data-prototype={hole.prototype}
      data-id={hole.id}
      data-selected={hole.selected}
      data-layer={layer.id}
    >{renderedHole}</G>;
  });

  let {unit} = scene;
  let {x: x11, y:y11} = layer.vertices[line.vertices[0]];
  let {x: x22, y: y22} = layer.vertices[line.vertices[1]];
  let length1 = pointsDistance(x11, y11, x22, y22);

  let path1 =  `M${0} ${ -epsilon} L${length1} ${-epsilon} L${length1} ${epsilon} L${0} ${epsilon} z`;

  let renderedLine = <Path
    d={path1} style={{stroke: '#99c3fb', strokeWidth: '5px', fill: '#8E9BA2'}}
  />;

  let renderedRuler = line.selected ? <Ruler unit={unit} length={length} transform="translate(0, 15)"/> : null;

  return (
    <G
      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)`}
      data-element-root
      data-prototype={line.prototype}
      data-id={line.id}
      data-selected={line.selected}
      data-layer={layer.id}
      style={line.selected ? {cursor: "move"} : {}}
    >
      {renderedRuler}
      {renderedLine}
      {renderedHoles}
    </G>
  );

}

