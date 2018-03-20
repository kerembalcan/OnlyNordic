/* @flow */
import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator, TabBarTop, TabBarBottom } from 'react-navigation';
import ConnectedInitialScreenComponent from "./InitialScreen/containers";
import {FEED, INFO_SIDE, INITIAL_SCREEN, PROFILE, SWIPE} from "./routes";
import ConnectedImageFeedComponent from "./ImageFeed/containers";

/////// SalaryHours Navigator
let feedStackRouteConfiguration = {};
feedStackRouteConfiguration[FEED] = {screen: ConnectedImageFeedComponent};

const feedStackNavigatorConfiguration = {
  initialRouteName: FEED,
  mode: "modal"
};
const FeedStackNavigator = StackNavigator(feedStackRouteConfiguration, feedStackNavigatorConfiguration);


/////// Profile Navigator
let profileRouteConfiguration = {};
profileRouteConfiguration[FEED] = {screen: FeedStackNavigator };

const profileTabNavigatorConfiguration = {
  initialRouteName: FEED,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    upperCaseLabel: false,
    renderIndicator: () => null,
    // style: {
    //   backgroundColor: FARMBACKUP_DARK_GREY,
    //   height: isIOS() ? 50 : 60
    // },
    // activeTintColor: FARMBACKUP_GREEN_474,
    // inactiveTintColor: FARMBACKUP_LIGHT_GREY,
    // labelStyle: {
    //   fontSize: 12,
    //   fontFamily: OVERPASS_REGULAR
    // },
    // indicatorStyle: {
    //   backgroundColor: 'white'
    // },
  }
};
const ProfileNavigator = TabNavigator(profileRouteConfiguration, profileTabNavigatorConfiguration);


/////// Info Side Menu Navigator
const infoSideMenuRouteConfiguration = {};
infoSideMenuRouteConfiguration[PROFILE] = {screen: ProfileNavigator};

const infoSideMenuNavigatorConfiguration = {
  initialRouteName: PROFILE,
  // contentComponent: ConnectedInfoSideMenuContentComponent,
  // drawerWidth: getDeviceDimensions().width * 280 / 375
};

const InfoSideMenuNavigator = DrawerNavigator(infoSideMenuRouteConfiguration, infoSideMenuNavigatorConfiguration);

/////// Main Navigator
let mainRouteConfiguration = {};
mainRouteConfiguration[INITIAL_SCREEN] = {screen: ConnectedInitialScreenComponent }; // Real component
mainRouteConfiguration[INFO_SIDE] = {screen: InfoSideMenuNavigator }; // Tab Navigator


const mainStackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: INITIAL_SCREEN
};

const MainNavigator = StackNavigator(mainRouteConfiguration, mainStackNavigatorConfiguration);

export default MainNavigator;