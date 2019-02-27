import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { AppHeader } from '../../component';
import {
  AppView,
  AppButton,
  AppIcon,
  AppText,
} from '../../common';
import styles from './styles';
import { Image } from "react-native";
import { responsiveWidth } from '../../common/utils/responsiveDimensions';
import { Navigation } from 'react-native-navigation';
import headerLeft from "../../assets/imgs/cover.png"

import Axois from "axios"
class LocationMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: null,
      mapReady: false,
      firstLocationSet: false,
      markerLoc: null,
      loading: false,
      data: props.data
    };

    this.mapRef = React.createRef();

    this.latitudeDelta = 0.007016387588862472;
    this.longitudeDelta = 0.004741139709949493;
  }

  goToLocation = loc => {

    if (this.state.mapReady && loc.latitude && loc.longitude) {


      this.setState({
        markerLoc: loc,
      });
      this.mapRef.current.animateToRegion({
        ...loc,
        latitudeDelta: this.latitudeDelta,
        longitudeDelta: this.longitudeDelta,
      });
    }
  };

  setCurrentlocation = () => {
    const latitude = parseFloat(this.props.data.lat)
    const longitude = parseFloat(this.props.data.lon)

    const loc = {
      longitude,
      latitude
    }

    setTimeout(() => {
      this.setState({
        firstLocationSet: true,
        currentLocation: {
          latitude,
          longitude,
        },
        markerLoc: {
          latitude,
          longitude,
        },
      });
      this.goToLocation(loc);
    }, 500);
  };


  renderMyLocationButton = () => {
    if (!this.state.mapReady) return null;

    return (
      <AppButton
        backgroundColor="white"
        borderColor="primary"
        borderWidth={1}
        circleRadius={12}
        style={[
          styles.myLocationButton,
          {
            left: this.props.rtl ? responsiveWidth(5) : undefined,
            right: this.props.rtl ? undefined : responsiveWidth(5),
          },
        ]}
        onPress={() => {
          this.goToLocation(this.props.currentLocation);
        }}
      >
        <AppIcon
          name="location-searching"
          type="material"
          color="primary"
          size={8}
        />
      </AppButton>
    );
  };


  onHandleAnotherRest = async () => {
    const { currentLocation } = this.props
    this.setState({
      loading: true
    })
    try {
      const response = await Axois.get(`https://wainnakel.com/api/v1/GenerateFS.php?uid=${currentLocation.latitude},${currentLocation.longitude}&get_param=value`)


      const latitude = parseFloat(response.data.lat)
      const longitude = parseFloat(response.data.lon)

      const loc = {
        longitude,
        latitude
      }

      setTimeout(() => {
        this.setState({
          firstLocationSet: true,
          loading: false,
          data: response.data,

          currentLocation: {
            latitude,
            longitude,
          },
          markerLoc: {
            latitude,
            longitude,
          },
        });
        this.goToLocation(loc);
      }, 500);



    } catch (error) {

      this.setState({
        loading: false
      })
      alert("حاول مره اخري")

    }

  }
  renderAnotherTryButton = () => (

    <AppButton
      style={styles.confirmButton}

      backgroundColor="#1B9595"
      paddingVertical={5}

      marginHorizontal={30}

      stretch
      onPress={() => {

        this.onHandleAnotherRest()
      }}

      processing={this.state.loading}
      height={7}



      title="اقتراح اخر"
    />

  );

  renderOpenLocationButton = () => (
    <AppView style={styles.spinnerContainer}>
      <AppText>من فضلك قم بتفعيل خاصية تحديد الموقع</AppText>
      <AppButton
        backgroundColor="primary"
        marginVertical={6}
        width={50}
        height={5}
        onPress={() => {
          BackgroundGeolocation.showLocationSettings();
        }}
      >
        <AppText color="white">اعدادات تحديد المكان</AppText>
      </AppButton>
    </AppView>
  );

  renderMap = () => (
    <MapView
      provider="google"
      ref={this.mapRef}
      style={styles.container}
      rotateEnabled={false}
      showsUserLocation={false}
      showsMyLocationButton={true}
      showsCompass={false}
      onLayout={() => {
        // this.setState({ mapReady: true });
      }}
      onMapReady={() => {
        this.setState({ mapReady: true });
        this.setCurrentlocation();
      }}
      onLongPress={e => {
        this.setState({
          markerLoc: e.nativeEvent.coordinate,
        });
      }}
    >
      {this.props.ready && this.renderMarker()}
    </MapView>
  );



  renderMarker = () => {
    if (this.state.markerLoc === null) return null;

    return (
      <Marker
        coordinate={{
          latitude: this.state.markerLoc.latitude,
          longitude: this.state.markerLoc.longitude,
        }}
      >
        <AppView style={{ overflow: 'visible' }}>

          <AppIcon name="map-marker-alt" type="font-awesome5" color="primary" size={12} />

        </AppView>
      </Marker>
    );
  };


  renderIconsSections = () => {
    return (
      <AppView stretch flex borderBottomWidth={1} row borderBottomColor="grey" paddingVertical={5} >
        <AppView flex center padding={5}>
          <AppIcon name="infocirlceo" size={6} type="ant" color="#3C3C3C" />
        </AppView>
        <AppView flex center padding={5} borderLeftColor="grey" borderRightColor="grey" borderLeftWidth={1} borderRightWidth={1}>

          <AppIcon name="image" size={7.5} type="entypo" color="#3C3C3C" />
        </AppView>
        <AppView flex center padding={5} >

          <AppIcon name="heart" size={7.5} type="ant" color="#3C3C3C" />
        </AppView>
        <AppView flex center padding={5} borderLeftColor="grey" borderRightColor="grey" borderLeftWidth={1} borderRightWidth={1}>

          <AppIcon name="upload" size={7.5} type="ant" />
        </AppView>
        <AppView flex center padding={5}>
          <AppIcon name="location-on" size={7.5} type="material" color="#3C3C3C" />
        </AppView>


      </AppView>
    )
  }

  renderRestInfo = () => {
    const { data } = this.state

    // console.log("data to map==>>", data);

    return (
      <AppView stretch centerX backgroundColor="white" style={styles.restInfo} >
        <AppView row paddingTop={5} >
          <AppText color="#1B9595" size={7} bold>

            | {data.name}

          </AppText>

          <AppText color="#1B9595" size={7} bold>
            {data.cat}
          </AppText>
        </AppView>
        <AppText color="#939394" row>
          {data.cat} {' '}
          <AppText marginHorizontal={5}>
            {data.rating}/ 10
              </AppText>
        </AppText>
        {this.renderIconsSections()}
      </AppView>
    )
  }
  renderMapContainer = () => (
    <AppView flex stretch>



      {this.renderAnotherTryButton()}
      {this.renderMyLocationButton()}
      {this.renderMap()}
      {this.renderRestInfo()}
    </AppView>
  );

  render() {
    return (
      <React.Fragment>
        <AppHeader title="وين ناكل ؟" componentId={this.props.componentId} menu rowItems={[
          <AppIcon name="back-in-time" type="entypo" color="white" size={10} onPress={() => {
            Navigation.pop(this.props.componentId)
          }} />]} />
        {this.props.gpsRunning
          ? this.renderMapContainer()
          : this.renderOpenLocationButton()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
  currentLocation: state.location.current,
  gpsRunning: state.location.gpsRunning,
  ready: state.location.ready,

  
});

export default connect(
  mapStateToProps,
  null,
)(LocationMap);
