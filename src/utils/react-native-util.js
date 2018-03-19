/* @flow */

import {Platform}from "react-native";
import {Dimensions} from "react-native";

type DeviceDimensions = {
  width: number,
  height: number
}

export function getDeviceDimensions() : DeviceDimensions {
  return Dimensions.get('window');
}
const DESIGN_TEMPLATE_DEVICE_WIDTH = 375;
const {height, width} = getDeviceDimensions();
export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function getResponsiveDpi(value : number) {
  return value * DEVICE_WIDTH / DESIGN_TEMPLATE_DEVICE_WIDTH;
}