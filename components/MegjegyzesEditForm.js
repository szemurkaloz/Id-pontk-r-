import React from 'react';
import {Text, Stack, Center, Icon, Button, useTheme, ScrollView} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, TextInput, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LabelElem } from './LabelElem';

//import {SimaButton} from './SimaButton';
/*
"adat": {
        "paciensNev": "3 Év Alatti Gyermek",
        "szulDatum": "2018-01-31",
        "orvos": "Kovács József",
        "cimke": "Gyerekorvos34",
        "key": "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-76D06771-872F-48AF-BAFC-25819937B0A5",
        "id": "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-76D06771-872F-48AF-BAFC-25819937B0A5",
        "szerep": "asszisztens"
      }
*/
const MegjegyzesEditForm = ({adat, clickHandler}) => {
  const {control, handleSubmit} = useForm();
  const {colors} = useTheme();
  const onSubmit = data => {
    //console.log('Szerkesztett adat', adat);
    //Tárolási kulcsot is átadni
    //console.log('Szerkesztett adat', data);
    adat.cimke = data.cimke;
    clickHandler(adat);
  };

  /*
  <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.inputDisabled}
                onBlur={onBlur}
                editable={false}
                value={value}
              />
            )}
            name="paciensNev"
            defaultValue={adat.paciensNev}
          />
  */

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView>
        <Stack>
          <Text 
            color='white'
            marginLeft={6}
            mt={5}
            fontSize={{base: 'md', md: '3xl'}}
            >
              Név
          </Text>
          <LabelElem title={adat.paciensNev}/>

          <Text 
              color='white'
              marginLeft={6}
              mt={5}
              fontSize={{base: 'md', md: '3xl'}}
          >
            Születés dátuma
          </Text>
          <LabelElem title={adat.szulDatum}/>          
          <Text 
              color='white'
              marginLeft={6}
              mt={5}
              fontSize={{base: 'md', md: '3xl'}}
          >
            {(adat.szerep) ? adat.szerep.charAt(0).toUpperCase() +
              adat.szerep.slice(1).toLowerCase() : ""}
          </Text>
          <LabelElem title={adat.orvos}/>
          <Text 
              color='white'
              marginLeft={6}
              mt={5}
              fontSize={{base: 'md', md: '3xl'}}
          >
            Emlékeztető
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Megjegyzés pl ...háziorvos"
                onChangeText={value => onChange(value)}
                value={value}
                maxLength={70}
              />
            )}
            name="cimke"
            defaultValue={adat.cimke}
          />
          <Center>
          <Button 
              mt={5}
              w={[160, 270]}
              _text={{
                fontSize: ['sm', 'md', 'lg'],
                color: 'white',
                fontWeight: 'bold',
              }}
              startIcon={
                <Icon as={Ionicons} 
                  name="checkbox-outline" 
                  size={6}
                  color="#FFFFFF" 
                />
              }
              colorScheme="emerald"
              bg="#006600"
              onPress={handleSubmit(onSubmit)}
              >
              Elfogad
            </Button>
          </Center>
        </Stack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 19,
    width: '90%',
    color: 'black',
    borderWidth: 1,
		backgroundColor: "#e6ffe6",
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
});

export default MegjegyzesEditForm;
/*
<SimaButton 
              caption="Elfogad"
              onPress={handleSubmit(onSubmit)}
              />
<Button 
              mt={5}
              w={[160, 270]}
              _text={{
                fontSize: ['sm', 'md', 'lg'],
                color: 'white',
                fontWeight: 'bold',
              }}
              startIcon={
                <Icon as={Ionicons} 
                  name="checkbox-outline" 
                  size={6}
                  color="#FFFFFF" 
                />
              }
              colorScheme="green"
              onPress={handleSubmit(onSubmit)}
              >
              Elfogad
            </Button>

*/
