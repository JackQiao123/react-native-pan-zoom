import React from 'react';
import {
    G,
    Rect
} from 'react-native-svg';

import Guides from './guides/guides';
import Layer from './layer';

export default function State({ state, onSelectItem }) {
    const layer = state.layers[state.selectedLayer];
    return (
        <G>
            <Rect x="0" y="0" width={state.width} height={state.height} fill="white" />
            <G transform={`translate(0, ${state.height}) scale(1, -1)`}>
                <G>
                    <Guides scene={state} />
                    <G style={{ pointerEvents: 'none' }}>
                        <Layer key={state.selectedLayer} layer={layer} scene={state} onSelectItem={() => {onSelectItem(layer.items)}} />
                    </G>
                </G>
            </G>
        </G>
    );
}