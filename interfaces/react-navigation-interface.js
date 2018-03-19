/* @flow */
import React from 'react';
declare module "react-navigation" {
  declare function StackNavigator(route : Object, config : Object): React.Component
  declare function TabNavigator(route : Object, config : Object): React.Component
  declare function DrawerNavigator(route : Object, config : Object): React.Component

  declare function TabBarTop(): React.Component
  declare function TabBarBottom(): React.Component

  declare function NavigationActions(): React.Component
  declare function SafeAreaView(): React.Component

}