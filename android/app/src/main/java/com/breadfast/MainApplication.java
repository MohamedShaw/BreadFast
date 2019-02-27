package com.breadfast;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
 import com.oblador.vectoricons.VectorIconsPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.opensettings.OpenSettingsPackage;


public class MainApplication extends NavigationApplication {
     
     @Override
     protected ReactGateway createReactGateway() {
         ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
             @Override
             protected String getJSMainModuleName() {
                 return "index";
             }
         };
         return new ReactGateway(this, isDebug(), host);
     }
 
     @Override
     public boolean isDebug() {
         return BuildConfig.DEBUG;
     }
 
     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new VectorIconsPackage(),
             new MapsPackage(),
             new RNGestureHandlerPackage(),
             new BackgroundGeolocationPackage(),
             new OpenSettingsPackage()

         );
     }
   
     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }

     
    
 }
