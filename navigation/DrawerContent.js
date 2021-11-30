import React from 'react';
import {Image, Box, Text} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as Linking from 'expo-linking';

export function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props}  />
      <DrawerItem
        label="Segítség"
        onPress={() => Linking.openURL('http://elojegyzes.hu/')}
        activeBackgroundColor="#27272a"
        inactiveBackgroundColor="#166534"
        labelStyle={{color: '#FFFFFF'}}
      />
    </DrawerContentScrollView>
  );
}

/*
<Box>
        <Image
          resizeMode={'contain'}
          m={3}
          width={180}
          height={70}
          source={require('../assets/medmaxlogo.jpg')}
          alt="medmaxlogo"
        />
      </Box>
*/

/*

      <DrawerItem label="Help" onPress={() => alert('Progi leírása')} />
*/