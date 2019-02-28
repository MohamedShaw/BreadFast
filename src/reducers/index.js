import { combineReducers } from 'redux';

import lang from './lang';

import location from './location';
import shoppingCart from './shoppingCart';

export default combineReducers({
  lang,

  location,
  shoppingCart,
});
