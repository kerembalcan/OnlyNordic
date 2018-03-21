/* @flow */
import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {StackContainer} from "../PureComponents/stackContainer";
import RNNYTPhotoViewer from "../NativeModules/RNNYTPhotoViewer/RNNYTPhotoViewer";
import type {CompleteProps} from "./containers";
import {FEED} from "../routes";

type ImageGalleryState = {
  visible: boolean,
  initial: number
}

export default class ImageGalleryComponent extends React.Component {
  props: CompleteProps;
  state: ImageGalleryState;

  constructor(props : CompleteProps) {
    super(props);
    this.state = {
      visible: true,
      initial: 0
    };
  }

  render() {
    const {container} = styles;
    const {photos, page,navigation} = this.props;
    const {visible, initial} = this.state;

    return (
      <StackContainer style={container}>
        <RNNYTPhotoViewer
          visible={visible}
          data={photos}
          hideStatusBar={true}
          initial={initial}
          onDismiss={e => {
            this.setState({ visible: false });
          }}/>
        <TouchableOpacity onPress={() => this.setState({ visible: true })}><Text>Gallery</Text></TouchableOpacity>
      </StackContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});