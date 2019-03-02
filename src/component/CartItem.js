import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import {
  AppScrollView,
  AppView,
  AppImage,
  AppText,
  AppButton,
  AppIcon,
  AppNavigation
} from '../common';
import colors from '../common/defaults/colors';

import cover from '../assets/imgs/cover.png';

import { Navigation } from "react-native-navigation";
import { addProductToCart, removeItem } from "../actions/shoppingCart";

class CartItem extends Component {
  

  renderProviderImg = () => {
    const { data } = this.props;

    return (
      <AppImage
        stretch
        source={{ uri: data.images }}
        resizeMode="stretch"
        borderRadius={10}
        // equalSize={50}
        width={80}
        height={20}



      />
    );
  };

  renderProductDetailes = () => {
    const { data } = this.props;
    return (
      <AppView stretch left >
        <AppText>{data.name}</AppText>
        <AppText>EGP. {data.price}</AppText>
      </AppView>
    );
  };

  renderAction = () => {
    const { data } = this.props;
    return (
      <AppView row stretch marginTop={4}>
        <AppButton
          flex
          leftIcon={<AppIcon name="ios-add" type="ion" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            this.props.onAddToCart(data, 1)
          }}
          height={6}
        />
        <AppView flex={2} bw={1} bc="grey" stretch marginHorizontal={3} height={6}
          center>
          <AppText>{data.counter}</AppText>
        </AppView>
        <AppButton
          flex
          leftIcon={<AppIcon name="minus" type="ant" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            this.props.onAddToCart(data, -1)

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
          this.props.onAddToCart(data)

        }}
        stretch
        paddingVertical={5}
        center
        height={6}
      >
        <AppText>ADD TO CART</AppText>
      </AppView>
    );
  };

  renderRemoveProduct = () => {
    const {data} = this.props
    return (
      <AppButton
        leftIcon={<AppIcon name="close" type="ant" size={10} color="red" />}
        backgroundColor="#F0F0F0"
        style={{ position: "absolute", right: 5, top: 5 }} 
        onPress={()=>{
          this.props.onRemoveItem(data)
        }

        }/>
    )
  }

  render() {
    const { style, data, ...rest } = this.props;

    return (
      <AppView
        style={style}
        backgroundColor="white"

        stretch
        flex
        {...rest}
        marginHorizontal={3}
        marginTop={5}
        center
      >
        {this.renderProviderImg()}
        {this.renderProductDetailes()}
        {this.renderAction()}
        {this.renderRemoveProduct()}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});


const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (product, counter) => dispatch(addProductToCart(product, counter)),
    onRemoveItem: (item) => dispatch(removeItem(item)),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
