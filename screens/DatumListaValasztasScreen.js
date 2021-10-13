import React, {useState, useCallback} from 'react';
import {FlatList, Center, View, Text, Box} from 'native-base';
import {TouchableOpacity, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/hu';

import {fetchListaDate} from '../shared/AxiosKeresek';
import {renderListFooter} from '../components/ListFooter';

/*const NapokTomb = [
    {"key":"2021-08-06T08:00:00.000+02:00","label":"2021-08-06"},
    {"key":"2021-08-07T08:15:00.000+02:00","label":"2021-08-07"},
    {"key":"2021-08-08T08:30:00.000+02:00","label":"2021-08-08"},
    {"key":"2021-08-10T08:45:00.000+02:00","label":"2021-08-10"},
    {"key":"2021-08-11T08:45:00.000+02:00","label":"2021-08-11"},
  ]*/

export const DatumListaValasztasScreen = ({route, navigation}) => {
  const [datumTomb, setdatumTomb] = useState(undefined);

  useFocusEffect(
    useCallback(() => {
      console.log('Dátumlista kezd');
      //console.log("Datum route a listában:", route.params.adat.id);
      fetchListaDate(route.params.adat.id).then(x => {
        setdatumTomb(x);
      });
      //setdatumTomb(NapokTomb)
      //console.log(`Atat ami lekérsz ${JSON.stringify(route.params.adat.id)}`)
      return () => {
        console.log('Dátumlista befejezve');
      };
    }, [route.params.adat.id]),
  );
  moment.locale('hu');

  const renderItem = ({item}) => {
    //console.log("Datum a listában:", item)
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OraPercListaValasztas', {
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
          {moment(item.key).format('YYYY.MM.DD.')}
          {moment(item.key).locale('hu').format('dddd')}
        </Center>
      </TouchableOpacity>
    );
  };

  return (
      <Box
      bg={{
        linearGradient: {
          colors: ["#B5D275", "#0F5538", "#001216"],
          start: [0, 0.1],
          end: [0, 1],
        },
      }}
      >
      {Array.isArray(datumTomb) && (
        <View>
          <Text
            mt={10}
            fontSize={{base: 'md', md: '3xl'}}
            color='white'
            alignSelf={{
              base: 'center',
              md: 'center',
            }}>
            Válassza ki a napot
          </Text>
          <FlatList
            data={datumTomb}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            ListFooterComponent={renderListFooter}
            />
        </View>
      )}
      </Box>
  );
};
