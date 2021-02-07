import React, { Component } from 'react';
import {
  G,
  Circle,
  Rect,
  Text
} from 'react-native-svg';
import { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import If from './react-if';

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  strokeWidth: '3px',
  cursor: "ew-resize"
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.item.selected
    };
  }
  render() {
    const { selectedItem } = this.state;
    const { layer, item, onSelectItem } = this.props;
    let {x, y, rotation} = item;
    let renderedItem = null;

    const angle = item.rotation + 90;
    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    const numberStyle = {
      position: 'absolute',
      width: '20px',
      height: '20px',
      fill: '#0096fd',
      stroke: 'white',
      left: 50,
      bottom: 0
    };
    const nameStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      fill: 'black',
      stroke: 'black',
      left: 0,
      top: 0,
      fontSize: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    switch (item.type) {
      case 'balcony':
        const newWidth = item.properties.width.length;
        const newDepth = item.properties.depth.length;
        const fillValue = selectedItem ? '#99c3fb' : item.properties.patternColor;

        renderedItem = <G transform={`translate(${-newWidth / 2}, ${-newDepth / 2})`}>
          <Rect key="1" x="0" y="0" width={newWidth} height={newDepth} style={{stroke: selectedItem ? '#0096fd' : '#000', strokeWidth: '2px', fill: fillValue}} />
          <Text key="2" x="-30" y="0" transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1, -1) rotate(${textRotation})`} style={nameStyle}>
            {item.name}
          </Text>
        </G>;
        break;
      case 'concert-stage':
        let style = {
          stroke: '#000',
          strokeWidth: selectedItem ? '2px' : '0px',
          fill: item.properties.color
        };

        renderedItem = <G transform="translate(-50, -50)">
          <Rect x="0" y="0" width="300" height="100" style={style} />
          <Text key="2" x="0" y="0" transform={`translate(75, 40) scale(1,-1) rotate(${textRotation})`} style={nameStyle}>
            {item.name}
          </Text>
        </G>;
        break;
      case 'canteen-table':
      case 'couple-table':
        renderedItem =
          <G transform={`translate(-50, -80)`}>
            <Rect key="1" x="0" y="0" width="100" height="160" style={{stroke: selectedItem ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'}} />
            <Text key="2" x="0" y="0" transform={`translate(-20, 80) scale(1,-1) rotate(${textRotation})`} style={nameStyle}>
              {item.name}
            </Text>
            {
              item.number ? <G key="3" style={numberStyle}>
                <Circle key="4" cx="50" cy="0" r="30" />
                <Text key="5" x="0" y="6" transform={`translate(35, 0) scale(1,-1) rotate(${textRotation})`} style={nameStyle}>
                  {item.number}
                </Text>
              </G> : <Text></Text>
            }
          </G>;
        break;
      case 'round-table':
          let RADIUS = item.properties.radius.length;
          let circleStyle = {
            stroke: selectedItem ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'
          };
          renderedItem =
            <G>
              <Circle key="1" cx="0" cy="0" r={RADIUS} style={circleStyle} />
              <Text key="2" cx="0" cy="0" transform={`translate(${-RADIUS + 30}) scale(1,-1) rotate(${textRotation})`} style={nameStyle}>
                {item.seats ? item.seats + ' ' + item.name : item.name}
              </Text>
              {
                item.number ? <G key="3" style={numberStyle}>
                  <Circle cx="0" cy={RADIUS} r={30} />
                  <Text key="5" x="0" y="6" transform={`translate(-15, ${RADIUS}) scale(1,-1) rotate(${textRotation})`} style={nameStyle}>
                    {item.number}
                  </Text>
                </G> : <Text></Text>
              }
            </G>;
        break;
    }
    return (
      <SvgPanZoomElement
        onClick={() => {
          item.type.includes('table') ? this.setState({selectedItem: !selectedItem}) : item.selected = false;
          item.type.includes('table') ? item.selected = !item.selected : item.selected = false;
          onSelectItem();
        }}
      >
        <G
          data-element-root
          data-prototype={item.prototype}
          data-id={item.id}
          data-selected={selectedItem}
          data-layer={layer.id}
          style={selectedItem ? {cursor: "move"} : {}}
          transform={`translate(${x},${y}) rotate(${rotation})`}>
          {renderedItem}
          <If condition={selectedItem}>
            <G data-element-root
              data-prototype={item.prototype}
              data-id={item.id}
              data-selected={selectedItem}
              data-layer={layer.id}
              data-part="rotation-anchor"
            >
              <Circle cx="0" cy="150" r="10" style={STYLE_CIRCLE}/>
              <Circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2}/>
            </G>
          </If>
        </G>
      </SvgPanZoomElement>
    );
  }
}

export default Item;
