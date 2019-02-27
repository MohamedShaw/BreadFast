import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView } from 'react-native';

import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  getColors,
} from '../common';

import { Navigation } from "react-native-navigation";
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;



export default class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  };

  static defaultProps = {
    hideBack: false,
    rowItems: [],
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      Navigation.pop(this.props.componentId);
    }
  };

  renderRight = () => {
    const { rowItems, } = this.props;

    if (rowItems.length > 0) {
      return (
        <AppView row stretch paddingHorizontal={10} >
          {rowItems.map(item =>
            React.cloneElement(item, {
              key: String(Math.random()),
            }),
          )}
        </AppView>
      );
    }

   
  
    return <AppView stretch flex />;
  };

  renderLeft = () => {
    const { menu, hideBack } = this.props;

    if (menu)
      return (
        <AppButton
          leftIcon={<AppIcon name="menu" type="entypo" color="white" size={13} />}
          backgroundColor="transparent"
          size={8}
          ph={10}
          onPress={() => {}}
          flex
        />
      );

  
    if (hideBack) {
      return <AppView stretch flex />;
    }

    return (
      <AppView flex>
        <AppButton
          flex
          color="foreground"
          leftIcon={<AppIcon flip name="ios-arrow-back" type="ion" size={12} color ="white" />}
          onPress={this.goBack}
          paddingHorizontal={8}
          backgroundColor="transparent"
        />
      </AppView>
    );
  };

  render() {
    const { title, flat } = this.props;
    return (
      <SafeAreaView style={{ backgroundColor: '#1B9595', alignSelf: 'stretch' }}>
        <AppView
          stretch
          backgroundColor="#1B9595"
          style={{
            height: APPBAR_HEIGHT,
          }}
          row
          spaceBetween
          borderBottomColor="inputBorderColor"
          borderBottomWidth={0.5}
        >
          {this.renderLeft()}
          <AppView flex={3} center>
            <AppText size={6} bold numberOfLines={1} color="white">
              {title}
            </AppText>
          </AppView>
          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}
