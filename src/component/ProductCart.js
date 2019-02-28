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
} from '../common';
import colors from '../common/defaults/colors';

import cover from '../assets/imgs/cover.png';

class ProviderCard extends Component {
  state = {
    counter: 2,
  };

  renderProviderImg = () => {
    const { data } = this.props;
    return (
      <AppView stretch bc="green" bw={2}>
        <AppImage
          stretch
          source={cover}
          resizeMode="stretch"
          width={45}
          borderRadius={10}
          height={15}
          // flex
        />
      </AppView>
    );
  };

  renderProductDetailes = () => {
    const {} = this.props;
    return (
      <AppView stretch bc="red" bw={1}>
        <AppText>gdfg</AppText>
        <AppText>dgdg</AppText>
      </AppView>
    );
  };

  renderAction = () => {
    const {} = this.props;
    return (
      <AppView row stretch>
        <AppButton
          flex
          leftIcon={<AppIcon name="ios-add" type="ion" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            this.setState({
              counter: this.state.counter + 1,
            });
          }}
        />
        <AppView flex={2} bw={1} bc="grey" stretch center>
          <AppText>{this.state.counter}</AppText>
        </AppView>
        <AppButton
          flex
          leftIcon={<AppIcon name="minus" type="ant" color="darkgrey" />}
          backgroundColor="#F0F0F0"
          onPress={() => {
            this.setState({
              counter: this.state.counter - 1,
            });
          }}
        />
      </AppView>
    );
  };

  renderAddToCart = () => {
    const {} = this.props;
    return (
      <AppView
        bc="grey"
        bw={1}
        onPress={() => {
          alert('add');
        }}
        stretch
        paddingVertical={5}
        center
      >
        <AppText>ADD TO CART</AppText>
      </AppView>
    );
  };

  render() {
    const { style, ...rest } = this.props;
    return (
      <AppView
        style={style}
        backgroundColor="white"
        borderBottomWidth={0.5}
        borderBottomColor="grey"
        stretch
        // flex
        {...rest}
        marginHorizontal={3}
        // width={80}
        bc="red"
        bw={2}
        centerSelf
        onPress={() => {
          // this.setState({
          //   counter: this.state.counter + 1,
          // });
        }}
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

export default connect(mapStateToProps)(ProviderCard);
