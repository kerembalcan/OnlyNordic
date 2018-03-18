/* @flow */
import React from 'react';
import { requireNativeComponent, processColor, Platform, View } from "react-native";
import * as PropTypes from "prop-types";
const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
const ImageSourcePropType = require("react-native/Libraries/Image/ImageSourcePropType");


class RNNYTPhotoViewerComponent extends React.Component {
  constructor() {
    super(...arguments);
    /**
     * Handle UIColor conversions
     * @param data Photo[]
     */
    this.processor = (data) => {
      if (data && data.length) {
        return data.map(o => {
          const d = { ...o };
          if (typeof o.summaryColor === "string") {
            d.summaryColor = processColor(o.summaryColor);
          }
          if (typeof o.titleColor === "string") {
            console.warn("o.title", o.titleColor);
            d.titleColor = processColor(o.titleColor);
          }
          // resolve assets
          d.source = resolveAssetSource(o.source);
          return d;
        });
      }
      return data;
    };
  }
  render() {
    // nothing
    if (this.props.visible === false) {
      return null;
    }
    const { visible, data, initial, ...props } = this.props;
    const dataCopy = [...data];
    const transformData = this.processor(dataCopy);
    // initial
    let startPosition = initial;
    if (initial < 0) {
      startPosition = 0;
    }
    if (initial > dataCopy.length) {
      startPosition = dataCopy.length;
    }
    return (<RNNYTPhotoViewer {...props} initial={startPosition} data={transformData}/>);
  }
}
RNNYTPhotoViewerComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    source: Platform.OS === "ios"
      ? ImageSourcePropType
      : PropTypes.oneOfType([
        PropTypes.shape({
          uri: PropTypes.string,
          headers: PropTypes.objectOf(PropTypes.string)
        }),
        // Opaque type returned by require('./image.jpg')
        PropTypes.number,
        // Multiple sources
        PropTypes.arrayOf(PropTypes.shape({
          uri: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number
        }))
      ]),
    title: PropTypes.string,
    summary: PropTypes.string,
    titleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    summaryColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  visible: PropTypes.bool,
  initial: PropTypes.number.isRequired,
  hideStatusBar: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  hideShareButton: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  shareText: PropTypes.string,
  ...View.propTypes
};
RNNYTPhotoViewerComponent.defaultProps = {
  visible: false
};
var RNNYTPhotoViewer = requireNativeComponent("RNNYTPhotoViewer", RNNYTPhotoViewerComponent);
export default RNNYTPhotoViewer;