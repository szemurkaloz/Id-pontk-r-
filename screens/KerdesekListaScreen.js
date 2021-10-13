import React, {useState} from 'react';
import {
  FlatList,
  Box,
  HStack,
  Button,
  Checkbox,
  View,
  Center,
  Text,
  Flex,
  useTheme,
} from 'native-base';
import {Alert} from 'react-native';

import {BetoltesVan} from '../components/BetoltesVan';

const Item = ({item, onChange}) => (
  <Box px={5} py={2} rounded="md" m={2} bg="#65a30d">
    <HStack>
      <Box
        width="90%"
        h="auto"
        _text={{
          fontSize: ['md', 'lg', '3xl'],
          color: 'black',
          fontWeight: 'bold',
        }}>
        {item.question}
      </Box>
      <Center>
        <Checkbox 
          colorScheme="emerald" 
          size={["sm", "md"]}
          accessibilityLabel={item.status.toString()}
          value={item.status}
          onChange={onChange}
        />
      </Center>
    </HStack>
  </Box>
);

const UzenetHiba = `
Online időpontfoglalásra jelenleg nincs lehetősége.
Kérem, telefonon jelentkezzen be a rendelésre.
`;

export const KerdesekListaScreen = ({route, navigation}) => {
  const [kerdesekTomb] = useState(route.params.tomb);
  const {colors} = useTheme();

  //props.route.params.adat.Key
  /*
Object {
    "id": "1",
    "question": "Köhög?",
    "status": false,
  },
 */

  const onTovabbLep = () => {
    //kerdesekTomb.map((x) => console.log("Checked",x ))
    let igen = kerdesekTomb.some(x => x.status === true);
    if (!igen) {
      navigation.navigate('DatumListaValasztas', {adat: route.params.adat});
    } else {
      createFigyeleztetes();
    }
  };

  const renderListFooter = () => {
    return (
      <View py={10} borderTopWidth={1} borderColor="#CED0CE">
        <Center >
          <Button
            colorScheme="emerald"
            bg="#006600"
            onPress={onTovabbLep}
            w={[100, 270]}
            _text={{
              fontSize: ['sm', 'md', 'lg'],
              color: 'white',
              fontWeight: 'bold',
            }}>
            Tovább
          </Button>
        </Center>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onChange={() => {
          item.status = !item.status;
        }}
      />
    );
  };

  const createFigyeleztetes = () =>
    Alert.alert('Figyelmeztetés', UzenetHiba, [
      {
        text: 'Elfogad',
        onPress: () => {},
        style: 'default',
      },
    ]);

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
      <Text
            ml={3}
            mt={10}
            fontSize={{base: 'md', md: '3xl'}}
            color='white'
            alignSelf={{
              base: 'center',
              md: 'center',
            }}>
            Az időpontfoglaláshoz kérjük válaszoljon az alábbi kérdésekre.
            Jelölje meg azokat a sorokat, amelyekre igen a válasza.
          </Text>
      {kerdesekTomb === undefined && (
        <BetoltesVan captionText="Kérdések lekérése" />
      )}
      {kerdesekTomb && (
        <>
          <FlatList
            data={kerdesekTomb}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={renderListFooter}
          />
        </>
      )}
    </Flex>
  );
};
