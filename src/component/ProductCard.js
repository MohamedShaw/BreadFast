import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import {
  AppScrollView,
  AppView,
  AppImage,
  AppText,
  AppButton,
  AppIcon,
  AppNavigation,
} from '../common';
import colors from '../common/defaults/colors';

import cover from '../assets/imgs/cover.png';

import { addProductToCart } from '../actions/shoppingCart';

class ProviderCard extends Component {
  state = {
    counter: 1,
  };

  componentDidMount() {}

  renderProviderImg = () => {
    const { data } = this.props;

    return (
      <AppImage
        stretch
        source={{ uri: data.images }}
        resizeMode="stretch"
        borderRadius={10}
        equalSize={28}
        marginRight={10}
      />
    );
  };

  renderProductDetailes = () => {
    const { data } = this.props;
    return (
      <AppView stretch left>
        <AppText>{data.name}</AppText>
        <AppText>EGP. {data.price}</AppText>
      </AppView>
    );
  };

  change = amount => {
    let counter = this.state.counter + amount;
    if (counter <= 0) counter = 0;

    this.setState({
      counter,
    });
  };

  renderAction = () => {
    const {} = this.props;
    return (
      <AppView row stretch marginVertical={4}>
        <AppButton
          flex
          leftIcon={<AppIcon name="ios-add" type="ion" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            // this.setState({
            //   counter: this.state.counter + 1,
            // });
            this.change(1);
          }}
          height={6}
        />
        <AppView
          flex={2}
          bw={1}
          bc="grey"
          stretch
          marginHorizontal={3}
          height={6}
          center
        >
          <AppText>{this.state.counter}</AppText>
        </AppView>
        <AppButton
          flex
          leftIcon={<AppIcon name="minus" type="ant" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            //
            this.change(-1);
          }}
          height={6}
        />
      </AppView>
    );
  };

  renderAddToCart = () => {
    const { data } = this.props;
    return (
      <AppView
        bc="grey"
        bw={1}
        onPress={() => {
          // alert('add');
          this.props.onAddToCart(data, this.state.counter);
          this.setState({
            counter: 1,
          });
        }}
        backgroundColor={this.state.counter > 1 ? '#A80080' : 'white'}
        stretch
        paddingVertical={5}
        center
        height={6}
      >
        <AppText color={this.state.counter > 1 ? 'white' : null}>
          Aaa To Cart
        </AppText>
      </AppView>
    );
  };

  render() {
    const { style, data, ...rest } = this.props;

    return (
      <AppView
        style={style}
        backgroundColor="white"
        stretch
        // flex
        {...rest}
        marginHorizontal={3}
        width={45}
        paddingVertical={2}
        paddingHorizontal={2}
        onPress={() => {
          AppNavigation.push({
            name: 'productDetails',
            passProps: {
              data: this.props.data,
              counter: this.state.counter,
            },
          });
        }}
        marginTop={5}
      >
        {this.renderProviderImg()}
        {this.renderProductDetailes()}
        {this.renderAction()}
        {this.renderAddToCart()}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({
  onAddToCart: (product, counter) =>
    dispatch(addProductToCart(product, counter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProviderCard);
