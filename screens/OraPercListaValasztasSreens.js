import React, {useCallback, useState} from 'react';
import {FlatList, Center, View, Text, Flex} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {ValaszIsNull} from '../components/BetoltesVan';
import {fetchListaIdo} from '../shared/AxiosKeresek';
import {renderListFooter} from '../components/ListFooter';
/*
const OraPercTomb = [
    {"key":"2021-08-06T08:00:00.000+02:00","label":"08:00"},
    {"key":"2021-08-07T08:15:00.000+02:00","label":"08:15"},
    {"key":"2021-08-08T08:30:00.000+02:00","label":"08:30"},
    {"key":"2021-08-10T08:45:00.000+02:00","label":"08:45"},
    {"key":"2021-08-11T08:45:00.000+02:00","label":"08:45"},
  ]
*/
export const OraPercListaValasztasScreen = ({route, navigation}) => {
  const [idoTomb, setIdoTomb] = useState(undefined);

  useFocusEffect(
    useCallback(() => {
      fetchListaIdo(route.params.adat.id, route.params.datum).then(x => {
        setIdoTomb(x);
      });
      //setIdoTomb(OraPercTomb)
      //console.log(`Atat ami lekérsz ${JSON.stringify(route.params.adat.id)}`)
      return () => {
        //('Időpontlista befejezve');
      };
    }, [route.params.adat.id, route.params.datum]),
  );

  const renderItem = ({item}) => {
    //console.log("Oraperc elemek:", item.label);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('IdopontKeres', {
            adat: route.params.adat,
            datum: item,
          });
        }}>
        <Center
          rounded="lg"
          m={3}
          p={4}
          bg="#65a30d"
          _text={{
            fontSize: ['md', 'lg', '3xl'],
            color: 'white',
            fontWeight: 'bold',
          }}>
          {item.label}
        </Center>
      </TouchableOpacity>
    );
  };

  return (
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
      {!idoTomb && (
        <ValaszIsNull
          captionText="Értesítés"
          messageText="Nincs közzétett időpont, vagy elfogyott."
        />
      )}
      {idoTomb && (
        <View mt={6}>
          <Text
            bold
            fontSize={{base: 'md', md: '3xl'}}
            color='white'
            mb={4}
            alignSelf={{
              base: 'center',
              md: 'center',
            }}>
            Válassza ki az időpontot
          </Text>
          <FlatList
            data={idoTomb}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            ListFooterComponent={renderListFooter}
          />
        </View>
      )}
    </Flex>
  );
};