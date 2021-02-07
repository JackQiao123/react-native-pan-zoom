import React from 'react';
import {
    G
} from 'react-native-svg';
import SvgPanZoom from 'react-native-svg-pan-zoom';
import State from './state';


export default function Viewer2D({
    state, width, height, onSelectItem
}) {

    return (
        <SvgPanZoom
            canvasWidth={width}
            canvasHeight={height}
            minScale={0.1}
            initialZoom={0.26}
            onZoom={(zoom) => { console.log('onZoom:' + zoom) }}
            canvasStyle={{backgroundColor: 'yellow'}}
            viewStyle={{backgroundColor: 'green'}}
        >
            
            <G style={{ pointEvents: 'none' }}>
                <State state={state} onSelectItem={onSelectItem} />
            </G>
        </SvgPanZoom>
    );
}