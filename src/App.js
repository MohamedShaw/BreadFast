const { Navigation } = require('react-native-navigation');

import { registerScreens } from "./screens";
const { Platform } = require('react-native');
import store from './store';


import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from './actions/location';

export const  start = ()=> {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: "#2CB3B5",
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
                name: 'FindRest'
                // name: 'navigation.playground.CustomTransitionOrigin'
              }
            }
          ]
        }
      }
    });
  });
}

