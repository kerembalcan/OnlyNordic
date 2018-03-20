/* @flow */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import type {CompleteProps} from "./containers";
import {StackContainer} from "../PureComponents/stackContainer";
import {Spinner} from "../PureComponents/spinner";
import {INFO_SIDE, PROFILE} from "../routes";



export default class InitialScreenComponent extends React.Component {
  props: CompleteProps;
  componentDidMount() {
    const {loadImages} = this.props;
    loadImages();
  }

  render() {
  const {container} = styles;
  const {isRequestingPhotos, page, photos, navigation} = this.props;
    return (
      <StackContainer style={container}>
        {isRequestingPhotos && <Spinner/>}
        <TouchableOpacity onPress={() => navigation.navigate(INFO_SIDE)}><Text>Login</Text></TouchableOpacity>
      </StackContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 18
  },
});
