import { registerScreens } from './screens';
import store from './store';

import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from './actions/location';
import { AppNavigation } from './common';

const { Navigation } = require('react-native-navigation');
const { Platform, AsyncStorage } = require('react-native');

export const start = async () => {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: '#A80080',
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
    });

    // checkLocationPermission(true, () => {
    //   initBackgroundGeolocation(store.dispatch, store.getState);
    // });

    let cart = '';
    let total = 0;
    let counter = 0;

    try {
      cart = await AsyncStorage.getItem('@CART');
      total = await AsyncStorage.getItem('@TOTAL');
      counter = await AsyncStorage.getItem('@COUNTER');
    } catch (error) {
      console.log('AsyncStorage#getItem error: ', error.message);
    }

    if (cart !== null || total !== null) {
      cart = JSON.parse(cart);
      total = JSON.parse(total);

      counter = JSON.parse(counter)
      store.getState().shoppingCart.cart = cart;
      store.getState().shoppingCart.totalPrice = +total;
      store.getState().shoppingCart.totalCounter = +counter;
    }

    AppNavigation.init('MAIN_STACK', {
      name: 'productList',
    });
  });
};
