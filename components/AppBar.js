import React from 'react';
import {IconButton, Icon, Box, Flex, StatusBar, Center, HStack} from 'native-base';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export function AppBar({navigation, screenTitle}) {
  return (
    <>
      <StatusBar  barStyle="default"/>

      <Flex
        direction="row"
        alignItems="center"
        justify="space-around"
        safeAreaTop
        height={60}
      >
        <HStack ml={7} space={3} alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  {navigation.openDrawer();}
                }>
                <IconEntypo name="menu" size={28} />
              </TouchableOpacity>
            </HStack>
        <Box alignItems="center" flexGrow={2} mr={35}>
          <Center
            _text={{
              fontSize: 20,
              fontWeight: 'semibold',
              fontFamily: 'sans-serif-medium'
            }}
          >
            {screenTitle}
          </Center>
        </Box>
      </Flex>
    </>
  );
}
/*
<>
      <StatusBar  barStyle="default"/>

      <Flex
        direction="row"
        alignItems="flex-start"
        safeAreaTop
        height={60}
      >
        <IconButton
          ml={7}
          icon={
            <Icon
              size={30}
              as={<IconEntypo name="menu" />}
              onPress={() => {
                navigation.openDrawer();
                //navigation.dispatch(CommonActions.goBack());
              }}
            />
          }
        />
        <Box alignItems="center" flexGrow={2} mr={35}>
          <Center
            _text={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            shadow={3}>
            {screenTitle}
          </Center>
        </Box>
      </Flex>
    </>
Ha az ikon helyét változtatod növeld a cimke jobb margóját
akkor kerül középre
*/
