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
    AppNavigation
} from '../../common';
import { AppHeader, ProductCart } from '../../component';
import {
    filterCart
} from "../../actions/shoppingCart";

class ProductList extends Component {

    componentDidMount() {
        console.log("props======>>>>>&&&&&&&&&&&&&&&&&&&&&&&&&&&&", this.props.data);

    }

    render() {
        const { data } = this.props
        return (
            <AppView stretch flex>
                <AppHeader title="تفاصيل الطلبات" componentId={this.props.componentId} cart />
                <AppView stretch center>
                    <AppView center>
                        <AppImage source={{ uri: data.images }} equalSize={50} stretch resizeMode="contain" />
                    </AppView>
                    <AppText>
                        Name : {data.name}
                    </AppText>
                    <AppText>
                        Price : {data.price} EGP
                    </AppText>


                    <AppText>
                        in_stock : {data.in_stock ? "Yes" : "No"}
                    </AppText>


                    <AppButton
                        title="ADD TO CART"
                        stretch
                        backgroundColor="grey"
                        marginHorizontal={20}
                        marginTop={20}
                        onPress={() => {

                            this.props.filterCart(data)


                            AppNavigation.push({
                                name: 'shoppingCart',

                            })

                        }} />
                </AppView>

            </AppView>
        );
    }
}

const mapStateToProps = state => ({
    currentLocation: state.location.current,
});

const mapDispatchToProps = dispatch => {
    return {
        filterCart: (product) => dispatch(filterCart(product)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
