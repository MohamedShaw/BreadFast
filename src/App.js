import { registerScreens } from './screens';
import store from './store';

import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from './actions/location';

const { Navigation } = require('react-native-navigation');
const { Platform } = require('react-native');

export const start = () => {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: '#2CB3B5',
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

    Navigation.setRoot({
      root: {
        stack: {
          id: 'TEST',
          children: [
            {
              component: {
                name: 'productList',
              },
            },
          ],
        },
      },
    });
  });
};
