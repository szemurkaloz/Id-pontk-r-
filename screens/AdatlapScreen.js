import React from 'react';
import { HStack, Text, Flex, Link, Stack, Center } from 'native-base';
import Constants from 'expo-constants';
import { ImageBackground } from 'react-native';
//import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import { AppBar } from '../components/AppBar';

export function AdatlapScreen(props) {
  const handleOpenWithLinking = () => {
    Linking.openURL("http://elojegyzes.hu/");
  };

  return (
    <>
      <AppBar navigation={props.navigation} screenTitle="Névjegy" />
      <Flex
        w="100%"
        h="100%"
        bg={{
          linearGradient: {
            colors: ["#B5D275", "#0F5538", "#001216"],
            start: [0, 0.1],
            end: [0, 1],
          },
        }}
        justifyContent="flex-start"
      >
        <Center
          mt={30}>
          <Stack>
            <Text fontSize={22} ml={5} color='white' >
              ProFix Kft.
            </Text>
            <Text fontSize={18} ml={5} mt={1} color='white' >
              6800 Hódmezővásárhely, Szegfű u. 1-3.
            </Text>
            <Text fontSize={18} ml={5} mt={1} color='white' >
              info@medmax.hu
            </Text>
            <Link
              ml={5}
              mt={1}
              _text={{
                color: 'yellow.400',
                fontSize: 18,
              }}
              hrf="http://elojegyzes.hu/"
              isExternal
              onPress={handleOpenWithLinking}
            >
              http://elojegyzes.hu/
            </Link>
            <HStack>
              <Text fontSize={18} ml={5} mt={1} color='white' >
                Verzió:
              </Text>
              <Text fontSize={18} ml={5} mt={1} color='white' >
                {Constants.manifest.android.versionCode}.(
                {Constants.manifest.version})
              </Text>
            </HStack>
          </Stack>
        </Center>
      </Flex>
    </>
  );
}
//Linking.openURL("https://elojegyzes.hu")
//https://docs.expo.dev/guides/linking/#introduction