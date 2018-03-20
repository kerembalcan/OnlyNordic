/* @flow */
import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {isIOS} from "../utils/react-native-util";

type StackContainerProps = {
  style?: ?Object | Array<?Object> | ?number,
  children?: any,
  backgroundColor?: string
}

export const StackContainer = ({style, children, backgroundColor} : StackContainerProps) => {
  const defaultStyle = {
    flex:1,
    flexDirection: "column",
    backgroundColor: backgroundColor ? backgroundColor : "#00000000",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  };
  return (
    <View
      style={[defaultStyle, style]}>
      {children}
    </View>
  );
};