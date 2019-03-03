import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  FlatList,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Axois from 'axios';
import {
  AppButton,
  moderateScale,
  AppIcon,
  AppView,
  AppScrollView,
  AppText,
  AppSpinner,
  AppImage,
  AppNavigation,
} from '../../common';
import { AppHeader, ProductCart } from '../../component';
import { filterCart, addProductToCart } from '../../actions/shoppingCart';

class ProductList extends Component {
  render() {
    const { data } = this.props;
    return (
      <AppView stretch flex>
        <AppHeader
          title="Product Detail"
          componentId={this.props.componentId}
          cart
        />
        <AppView stretch center>
          <AppView center>
            <AppImage
              source={{ uri: data.images }}
              equalSize={50}
              stretch
              resizeMode="contain"
            />
          </AppView>
          <AppText>Name : {data.name}</AppText>
          <AppText>Price : {data.price} EGP</AppText>

          <AppText>in_stock : {data.in_stock ? 'Yes' : 'No'}</AppText>
          <AppText>Amount : {this.props.counter}</AppText>

          <AppButton
            title="Add To Cart  "
            stretch
            marginHorizontal={20}
            marginTop={20}
            onPress={() => {
              this.props.filterCart(data);
              this.props.onAddToCart(data, this.props.counter);

              AppNavigation.push({
                name: 'shoppingCart',
              });
            }}
          />
        </AppView>
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentLocation: state.location.current,
});

const mapDispatchToProps = dispatch => ({
  filterCart: product => dispatch(filterCart(product)),
  onAddToCart: (product, counter) =>
    dispatch(addProductToCart(product, counter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductList);
