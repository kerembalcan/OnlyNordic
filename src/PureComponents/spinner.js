/* @flow */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({size} : Object) => {
  return (
    <View>
      <ActivityIndicator size={size || 'large'}/>
    </View>
  )
};
export {Spinner}