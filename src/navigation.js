/* @flow */

import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator, TabBarTop, TabBarBottom } from 'react-navigation';
import ConnectedInitialScreenComponent from "./InitialScreen/containers";
import {INITIAL_SCREEN} from "./routes";

/////// Main Navigator
let mainRouteConfiguration = {};
mainRouteConfiguration[INITIAL_SCREEN] = {screen: ConnectedInitialScreenComponent }; // Real component
// mainRouteConfiguration[LOGIN] = {screen: ConnectedLoginComponent }; // Real component
// mainRouteConfiguration[SELECT_EMPLOYER] = {screen: ConnectedSelectEmployerComponent}; // Real component
// mainRouteConfiguration[INFO_SIDE_MENU] = {screen: InfoSideMenuNavigator};
// mainRouteConfiguration[CREATE_JOBSHEET_NAVIGATOR] = {screen: CreateJobsheetNavigator};
// mainRouteConfiguration[CREATE_SALARY_HOUR_NAVIGATOR] = {screen: CreateSalaryHourNavigator};
// mainRouteConfiguration[JOBSHEET_DETAILS] = {screen: JobsheetDetailsNavigator};
// mainRouteConfiguration[UPDATE_SALARY_HOUR] = {screen: UpdateSalaryHourNavigator};

const mainStackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: INITIAL_SCREEN
};

const MainNavigator = StackNavigator(mainRouteConfiguration, mainStackNavigatorConfiguration);

export default MainNavigator;