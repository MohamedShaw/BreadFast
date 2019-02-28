import { combineReducers } from 'redux';

import lang from './lang';

import location from './location';
import shoppingCart from './shoppingCart';
import network from './network';

export default combineReducers({
  lang,

  location,
  shoppingCart,
  network,
});
