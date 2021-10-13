import React from 'react';
import { View } from "react-native";
import { Box, Center, Text, Image, Stack, Button } from "native-base"

import OkeKep from "../assets/oke.png";
// néha Buttont is meg kell jeleníteni
export const OkeNyugta = ({szoveg, children}) => {
    return (
      <Center flex={1}>
       <Image style={{ width: 70, height: 70}} source={OkeKep} alt="okeKep" resizeMode={"contain"} marginBottom={5}/>
          <Text>{szoveg}</Text>
          {children}
      </Center>
    );
    
}

export const OkeNavButton = ({ caption, handlerClik }) => {
  return (<Stack
    direction={{
      base: "column",
      md: "row",
    }}
    space={2}
    marginTop="5"
    alignItems={{
      base: "center",
      md: "flex-start",
    }}
  ><Box width={250} height={60}>
      <Button 
          size={{ base: 'md', md: 'lg', lg: 'xl' }} 
          onPress={() => handlerClik()}
          colorScheme="green"
      >
        {caption}
      </Button></Box>
  </Stack>
  )
}

export const OkeNyugtaButton = ({szoveg, buttonText, clickHandler}) => {
  return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 180 }}>
          <Image style={{ width: 70, height: 70}} source={OkeKep} alt="okeKep"/>
          <Text h3 style={{ marginBottom: 40 }}>{szoveg}</Text>
          <Button
            title={buttonText}
            onPress={clickHandler}
            containerStyle={{width: '100%', height: 80}}
            colorScheme="green"
          />
        </View> 
  );
}

export const NyugtaButton = ({szoveg, buttonText, clickHandler}) => {
  return (
        <>
          <Text 
              h3 
              color='white'
              style={{ marginBottom: 20 }}
          >
              Üzenet
          </Text>
          <Text 
              h1 
              color='white'
              style={{ marginBottom: 40 }}
          >
            {szoveg}
          </Text>
          <Button
            onPress={clickHandler}
            colorScheme="green"
            h={47}
            w={[200, 400]}
            _text={{
              fontSize: ['sm', 'md', 'lg'],
              color: 'white',
              fontWeight: 'bold',
            }}
            >
              {buttonText}
            </Button>
        </> 
  );
}
