/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  View
} from 'react-native';
/**
 * @return {null}
 */
export default function If({ condition, style, children }) {
  return condition ? (Array.isArray(children) ? <View style={style}>{children}</View> : children) : null;
}