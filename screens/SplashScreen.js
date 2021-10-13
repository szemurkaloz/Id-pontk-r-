/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import AppLoading from 'expo-app-loading';
import {Asset} from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React, {useRef, useMemo, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, Dimensions} from 'react-native';
import {View, Image} from "native-base";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export function AnimatedAppLoader({children, image}) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => () => Asset.fromModule(image).downloadAsync(),
    [image],
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={true}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({children, image}) {
  const logoAnimation = useMemo(() => new Animated.Value(0));
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.sequence([
       /* Animated.spring(logoAnimation, {
          toValue: 1,
          tension: 10,
          friction: 2,
          duration: 2000,
          useNativeDriver: false,
        }),*/
        Animated.timing(moveAnim, {
          duration: 1000,
          toValue: Dimensions.get('window').width / 1.7,
          delay: 0,
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          duration: 1000,
          toValue: 0,
          delay: 0,
          useNativeDriver: false,
        }),
      ]).start();
      Animated.timing(fadeAnim, {
        duration: 2000,
        toValue: 1,
        delay: 1000,
        useNativeDriver: false,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady, moveAnim, fadeAnim, logoAnimation]);

  const onImageLoaded = React.useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  });

  return (
    <>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Constants.manifest.splash.backgroundColor,
            },
          ]}>
          <View>
            <Image
              style={{
                width: 212,
                height: 212,
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              alt="progi_logo"
            />
          </View>
          <Animated.View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: moveAnim,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              B
            </Text>
            <Animated.Text
              style={{
                color: 'black',
                fontSize: 22,
                fontWeight: 'bold',
                height: 40,
                opacity: fadeAnim,
              }}>
              ejelentkezés
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}