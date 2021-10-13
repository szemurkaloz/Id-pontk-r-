import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Center, Flex, ScrollView} from 'native-base';
import {GlobalContext} from '../shared/ListaContext';

import {taroldQrCodot} from '../shared/alapEljarasok';
import {OkeNyugta, NyugtaButton} from '../components/OkeNyugta';
import MegjegyzesEditForm from '../components/MegjegyzesEditForm';

const QrCodeElfogadScreen = props => {
  let adat = props.route.params.adat;
  const {editQrCard, addNewQrCard} = React.useContext(GlobalContext);

  /*let adat = {
    "paciensNev": "A-Sztatin Teszt",
    "szulDatum": "2001-01-03",
    "orvos": "",
    "cimke": "Sss",
    "key": "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-CA95E89E-9186-4730-839A-04D4AD19D236",
    "id": "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-CA95E89E-9186-4730-839A-04D4AD19D236",
    "szerep": "asszisztens",
    "fogIdopont": null,
    "kozlemeny": null
  }*/
  //console.log('Átadott paraméter',JSON.stringify(props.route.params,null,2))
  const [mentve, setMentve] = useState(false);

  const handleSubmit = async values => {
    try {
      let newQrCode = false;
      //Nincs még kulcs tehát új
      if (values.key == null) {
        values.key = values.id;
        newQrCode = true;
      }
      // Menteni ezt a 2 tulajdonságot nem kell
      const cloneValue = { ...values };
      delete cloneValue.fogIdopont;
      delete cloneValue.kozlemeny;
      await taroldQrCodot(cloneValue).catch(e => {
        // eslint-disable-next-line no-alert
        alert('Mentési hiba: ', e.message);
        setMentve(false);
      });
      if (newQrCode) {
        addNewQrCard(values);
      } else {
        editQrCard(values);
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
    Alert.alert("Üzenet", "A mentés sikeres", [
      {
        text: "Ok",
        onPress: () => {props.navigation.navigate('Home');},
      },
    ]);
    setMentve(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMentve(false);
      //console.log('Focus efect');
    }, []),
  );

  const handlerGoHome = () => {
    props.navigation.navigate('Home');
  };

  const renderelOkEredmeny = () => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
        <Center >
          <NyugtaButton
              szoveg="Sikeres mentés"
              buttonText='Home'
              clickHandler={handlerGoHome}
          />
        </Center>
    );
  };

  //<AppBar navigation={props.navigation} />

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'position'}>
            <MegjegyzesEditForm {...{adat: adat, clickHandler: handleSubmit}} />
          </KeyboardAvoidingView>
        </ScrollView>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

export default QrCodeElfogadScreen;
