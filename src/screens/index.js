import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import store from '../store';


import FindRest from './FindRest';
import LocationMap from './mapScreen/LocationMap';
import ProductList from './productList/ProductList';;

export const registerScreens = () => {
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
  Navigation.registerComponentWithRedux(
    'productList',
    () => gestureHandlerRootHOC(ProductList),
    Provider,
    store,
  );
};
