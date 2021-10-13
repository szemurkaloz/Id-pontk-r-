import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {HStack} from 'native-base';
import {DrawerActions} from '@react-navigation/native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';

import DoctorListaScreen from '../screens/DoctorListaScreen';
import CameraScreen from '../screens/CameraScreen';
import QrCodeElfogadScreen from '../screens/QrCodeElfogadScreen';
import {IdopontKeresScreen} from '../screens/IdopontKeresScreen';
import {DatumListaValasztasScreen} from '../screens/DatumListaValasztasScreen';
import {OraPercListaValasztasScreen} from '../screens/OraPercListaValasztasSreens';
import {KerdesekListaScreen} from '../screens/KerdesekListaScreen';
import {DatumUzenetekScreen} from '../screens/DatumUzenetekScreen';

const Stack = createStackNavigator();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={DoctorListaScreen}
        options={({navigation}) => ({
          headerTitle: 'Kapcsolatok',
          headerLeft: () => (
            <HStack ml={7} space={3} alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                <IconEntypo name="menu" size={28} />
              </TouchableOpacity>
            </HStack>
          ),
          headerRight: () => (
            <HStack mr={7} space={3} alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                <IconEntypo name="camera" size={28} />
              </TouchableOpacity>
            </HStack>
          ),
        })}
      />
      <Stack.Screen
        name="QrCodeElfogad"
        component={QrCodeElfogadScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Elfogadás',
          headerRight: () => (
            <HStack mr={7} space={3} alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                <IconEntypo name="camera" size={28} />
              </TouchableOpacity>
            </HStack>
          ),
        })}
      />
      <Stack.Group>
        <Stack.Screen
          options={{headerTitle: 'Kérdések'}}
          name="KerdesekLista"
          component={KerdesekListaScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Dátum'}}
          name="DatumListaValasztas"
          component={DatumListaValasztasScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Időpont'}}
          name="OraPercListaValasztas"
          component={OraPercListaValasztasScreen}
        />
        <Stack.Screen
          options={{headerTitle: 'Foglalás'}}
          name="IdopontKeres"
          component={IdopontKeresScreen}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitle: 'Értesítés',
            headerLeft: () => (
              <HStack ml={7} space={3} alignItems="center">
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(navigation.navigate('Home'))
                  }>
                  <IconEntypo name="chevron-left" size={28} />
                </TouchableOpacity>
              </HStack>
            ),
          })}
          name="DatumUzenetek"
          component={DatumUzenetekScreen}
        />
      </Stack.Group>
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Beolvasás',
          headerLeft: () => (
            <HStack mr={7} space={3} alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Entypo name="chevron-left" size={28} />
              </TouchableOpacity>
            </HStack>
          ),
        })}
        name="Camera"
        component={CameraScreen}
      />
    </Stack.Navigator>
  );
}