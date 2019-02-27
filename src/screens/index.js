import React, {Component} from "react"
import { Navigation } from "react-native-navigation";


import { Provider } from 'react-redux';
import store from '../store';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import FindRest from "./FindRest";
import LocationMap from "./mapScreen/LocationMap";


export const registerScreens=()=> {

  Navigation.registerComponentWithRedux(
    'FindRest',
    () => gestureHandlerRootHOC(FindRest),
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'LocationMap',
    () => gestureHandlerRootHOC(LocationMap),
    Provider,
    store,
  );
 
 





}

