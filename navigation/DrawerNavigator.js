import React from 'react';
import {TouchableOpacity} from 'react-native';
import {HStack} from 'native-base';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IconEntypo from 'react-native-vector-icons/Entypo';

//import {DeleteAllDataScreen} from '../screens/DeleteAllDataScreen';
import {AdatlapScreen} from '../screens/AdatlapScreen';
import {HomeStackNavigator} from './HomeStackNavigator';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {color: "#FFFFFF"},
        drawerActiveTintColor: "#27272a",
        drawerStyle: {
          backgroundColor: '#166534',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Kapcsolatok"
        component={HomeStackNavigator}
        options={({navigation}) => ({
          headerTitle: 'Kapcsolatok',
          labelStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
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
      <Drawer.Screen name="Adatlap" component={AdatlapScreen} options={{labelStyle:{color: 'white'}}} />
    </Drawer.Navigator>
  );
}

/*
<Drawer.Screen name="Alap állapot" component={DeleteAllDataScreen} />
*/

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};