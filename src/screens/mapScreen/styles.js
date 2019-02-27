import { StyleSheet } from 'react-native';

import Colors from '../../common/defaults/colors';

import Fonts from '../../common/defaults/fonts';
import {
  responsiveWidth,
  responsiveHeight,
  moderateScale,
} from '../../common/utils/responsiveDimensions';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  confirmButton: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    left: 0,
    right: 0,
    zIndex: 200,
  },
  myLocationButton: {
    //   
    position: 'absolute',
    bottom: responsiveHeight(12),
    zIndex: 500,
  },
  markerIcon: {
    //   
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  spinnerContainer: {
    //   
    position: 'absolute',
    alignItems: 'center',
    top: responsiveHeight(25),
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  restInfo:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    zIndex:10000,
    opacity: 0.5
  }
});

