import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import store from '../store';

import ProductList from './productList/ProductList';;
import ProducDetails from "./productDetails/ProducDetails"
import ShoppingCart from "./shoppingCart/ShoppingCart";

export const registerScreens = () => {
 
  Navigation.registerComponentWithRedux(
    'productList',
    () => gestureHandlerRootHOC(ProductList),
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'productDetails',
    () => gestureHandlerRootHOC(ProducDetails),
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'shoppingCart',
    () => gestureHandlerRootHOC(ShoppingCart),
    Provider,
    store,
  );
};
