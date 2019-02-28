import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';

import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Axois from 'axios';
import { AppButton, moderateScale, AppIcon } from '../common';
import cover from '../assets/imgs/cover.png';

class FindRest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onHandleRequest = async () => {
    const { currentLocation } = this.props;

    this.setState({
      loading: true,
    });

    try {
      const response = await Axois.post(
        `https://www.breadfast.com/wp-json/breadfast/testing/products/`,
        {
          token: '3f2o3hf2ougo2gbvg3lgb3lqpi1321d',
        },
      );
      this.setState({
        loading: false,
      });

      console.log('RESSS', response);

      Navigation.push('TEST', {
        component: {
          name: 'LocationMap',
          passProps: {
            data: response.data,
          },
        },
      });
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
      <ImageBackground source={cover} style={{ width: '100%', height: '100%' }}>
        <AppButton
          paddingVertical={8}
          title="اقترح"
          stretch
          processing={this.state.loading}
          marginHorizontal={20}
          style={{
            position: 'absolute',
            bottom: moderateScale(58),
            left: 0,
            right: 0,
          }}
          onPress={() => {
            this.onHandleRequest();
          }}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  currentLocation: state.location.current,
});

export default connect(
  mapStateToProps,
  null,
)(FindRest);
