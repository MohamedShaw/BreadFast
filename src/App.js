import { registerScreens } from './screens';
import store from './store';

import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from './actions/location';

const { Navigation } = require('react-native-navigation');
const { Platform } = require('react-native');
import {
  AppNavigation 
} from "./common";
export const start = () => {
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

    checkLocationPermission(true, () => {
      initBackgroundGeolocation(store.dispatch, store.getState);
    });

    AppNavigation.init('MAIN_STACK', {
      name: 'productList',
    });
  });
};
