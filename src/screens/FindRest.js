import React, { Component } from "react";
import { Text, TouchableOpacity, View, ImageBackground } from "react-native";

import { Navigation } from "react-native-navigation"
import { AppButton, moderateScale, AppIcon } from "../common";
import cover from "../assets/imgs/cover.png"
import { connect } from 'react-redux';


import Axois from "axios";
class FindRest extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

    }

    onHandleRequest = async () => {
        const { currentLocation } = this.props

        this.setState({
            loading: true
        })

        try {

            const response = await Axois.get(`https://wainnakel.com/api/v1/GenerateFS.php?uid=${currentLocation.latitude},${currentLocation.longitude}&get_param=value`)
            this.setState({
                loading: false
            })
            Navigation.push("TEST", {
                component: {
                    name: 'LocationMap',
                    passProps: {
                        data: response.data
                    },

                }
            })

        } catch (error) {

            this.setState({
                loading: false
            })
            alert("حاول مره اخري")

        }

    }
    render() {

     
        return (
            <ImageBackground source={cover} style={{ width: "100%", height: "100%" }}>

                <AppButton
                    paddingVertical={8}
                    title="اقترح"
                    stretch
                    processing={this.state.loading}
                    marginHorizontal={20}
                    style={{ position: 'absolute', bottom: moderateScale(58), left: 0, right: 0 }}
                    onPress={() => {
                        this.onHandleRequest()
                    }} />

            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({

    currentLocation: state.location.current,


});

export default connect(
    mapStateToProps,
    null,
)(FindRest);