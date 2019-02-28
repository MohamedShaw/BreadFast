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
} from '../../common';
import cover from '../../assets/imgs/cover.png';
import { AppHeader, ProductCart } from '../../component';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.onHandleRequest();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true, loading: false });
    this.onHandleRequest().then(() => {
      this.setState({ refreshing: false });
    });
  };

  onHandleRequest = async () => {
    try {
      const response = await Axois.post(
        `https://www.breadfast.com/wp-json/breadfast/testing/products/`,
        {
          token: '3f2o3hf2ougo2gbvg3lgb3lqpi1321d',
        },
      );
      console.log('REQUEST PARAMETERS ======>>>>>>>>>>>>', response.data.data);

      this.setState({
        loading: false,
        products: response.data.data,
      });

      console.log('RESSS', response);
    } catch (error) {
      this.setState({
        loading: false,
      });
      //   alert('حاول مره اخري');

      console.log('ERR', JSON.parse(JSON.stringify(error)));
    }
  };

  render() {
    return (
      <AppView stretch flex>
        <AppHeader title="قائمه الطلبات" />
        {this.state.loading ? (
          <AppView stretch center flex>
            <AppSpinner size={10} />
          </AppView>
        ) : (
          <AppScrollView stretch center>
            {this.state.products.map((i, index) => (
              <>
                <AppView stretch center bc="primary" bw={1} key={index}>
                  <AppText>{i.name}</AppText>
                  <AppText>{i.products.length}</AppText>
                </AppView>
                {/* {i.products.map((x, y) => (
                  <ProductCart />
                ))} */}
                <FlatList
                  data={i.products}
                  renderItem={({ item }) => <ProductCart />}
                  numColumns={2}
                  horizontal={false}
                  contentContainerStyle={
                    // this.props.columns > 1
                    {
                      // flex: 1,
                      // flexDirection: 'row',
                      // flexWrap: 'wrap',
                      // justifyContent: this.state.loading ? 'center' : 'space-between',
                    }
                    // : {}
                  }
                />
              </>
            ))}
          </AppScrollView>
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentLocation: state.location.current,
});

export default connect(
  mapStateToProps,
  null,
)(ProductList);
