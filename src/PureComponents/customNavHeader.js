/* @flow */
import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {isIOS} from "../utils/react-native-util";
import {ONLY_NORDIC_PURPLE, ONLY_NORDIC_SHADOW, ONLY_NORDIC_WHITE} from "../colors";

type CustomNavHeaderProps = {
  onRequestClose: () => void,
  title: string,
  navSaveButtonVisible?: boolean,
  navDeleteButtonVisible? : boolean,
  onRequestSave?: () => void,
  onRequestDelete?: () => void,
  leftButtonType? : string,
  rightButtonName? : string,
  leftButtonName? : string,
  parentContainerStyle?: Object | Array<Object>,
  containerStyle?: Object | Array<Object>
}

const CustomNavHeader = ({onRequestClose, title, navSaveButtonVisible, navDeleteButtonVisible, onRequestSave, onRequestDelete, leftButtonType, leftButtonName, rightButtonName, parentContainerStyle, containerStyle}: CustomNavHeaderProps) => {
  const {parentContainer, container, text, leftButton, leftText, rightButton} = styles;
  return <View style={[parentContainer, parentContainerStyle]}>
    <View style={[container, containerStyle]}>
      <Text style={text}>{title}</Text>
    </View>
  </View>
};

export {CustomNavHeader}

const styles = {
  parentContainer: {
    height: isIOS() ? 70 : 50,
    backgroundColor:ONLY_NORDIC_PURPLE,
    shadowColor: ONLY_NORDIC_SHADOW,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 1,
  },
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: ONLY_NORDIC_PURPLE,
    marginTop: isIOS() ? 20 : 0,
  },
  leftButton: {
    position: "absolute",
    alignItems: "center",
    zIndex: 2,
  },
  rightButton: {
    position: "absolute",
    alignItems: "center",
    right: 20,
    zIndex: 2,
    marginRight:0,
  },
  text: {
    flex: 1,
    textAlign: "center",
    // fontFamily: OVERPASS_EXTRA_BOLD,
    fontSize: 17,
    color: ONLY_NORDIC_WHITE,
  },
  leftText: {
    // fontFamily: OVERPASS_REGULAR,
    fontSize: 15,
    // color: FARMBACKUP_DARK_GREY
  }
};