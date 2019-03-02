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
    AppList
} from '../../common';
import { AppHeader, ProductCart, CartItem } from '../../component';

import {
    addProductToCart
} from "../../actions/shoppingCart";
class ProductList extends Component {

    render() {
        const { cart } = this.props

        if (cart.length === 0) {
            return (
                <AppView stretch flex center>
                    <AppText >
                        No Products 
                    </AppText>
                </AppView>
            )
        }

        return (
            <AppView stretch flex >
                <AppHeader title="Shopping Cart" componentId={this.props.componentId} />



                <AppScrollView stretch center paddingBottom={30}>
                    {this.props.cart.map((item, index) => {


                        return (
                            <CartItem data={item} />
                        )
                    })}
                </AppScrollView>

                <AppView
                    stretch
                    center
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                    paddingVertical={10}
                    elevation={3}
                    borderTopWidth={1}
                    borderTopColor="grey"
                >
                    <AppText> TOTAL PRICE: {this.props.cartPrice} </AppText>

                </AppView>
            </AppView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: product => dispatch(addProductToCart(product)),

    };
};
const mapStateToProps = state => ({

    cart: state.shoppingCart.cart,
    cartPrice: state.shoppingCart.totalPrice,

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
