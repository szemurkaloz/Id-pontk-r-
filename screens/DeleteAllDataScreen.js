import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Center, Modal, Box, Heading, Button} from 'native-base';
import {GlobalContext} from '../shared/ListaContext';
import {ImageBackground} from 'react-native';

import {olvasdAllKeysCount, torolAllQrCodot} from '../shared/alapEljarasok';
import {OkeNyugta} from '../components/OkeNyugta';
import {BetoltesVan} from '../components/BetoltesVan';
import {AppBar} from '../components/AppBar';

export const DeleteAllDataScreen = props => {
  const [mennyi, setMennyi] = useState(null);
  const [torolt, setTorolt] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {deleteAllQrCard} = React.useContext(GlobalContext);

  const fetchMennyi = async () => {
    //console.log(`mennyi meghívása1`);
    olvasdAllKeysCount().then(value => {
      setMennyi(value);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMennyi();
      return () => {};
    }, []),
  );

  useFocusEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      // do something
      setTorolt(false);
    });

    return unsubscribe;
  });

  const MennyiKapcsolatVan = () => {
    const onDeleteAllData = () => {
      //console.log("Mennyi Állapota", mennyi)
      if (mennyi === undefined) {
        return;
      }
      if (mennyi === 0) {
        return;
      }
      torolAllQrCodot().then(() => {
        setTorolt(true);
        deleteAllQrCard();
        setShowModal(false);
      });
    };

    return (
      <Center mt={10}>
        <Box>
          <Heading size="md" mb={3} color='white'>
            Töröl minden tárolt kapcsolatot ({mennyi}) db.
          </Heading>
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Törlés</Modal.Header>
            <Modal.Body>
              Biztosan töröl? A programban tárolt minden kapcsolat adat
              törlődik.
            </Modal.Body>
            <Modal.Footer>
              <Button.Group variant="ghost" space={2}>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Mégsem
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    onDeleteAllData();
                  }}>
                  Törlés
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Button
          width={140}
          maxWidth={200}
          my={3}
          colorScheme="green"
          onPress={() => {
            setShowModal(true);
          }}>
          Törlés
        </Button>
      </Center>
    );
  };

  const NullaKapcsolatVan = () => {
    return (
      <Center mt={10}>
        <Box>
          <Heading size="md" mb={3} color='white'>
            Önnek nincs tárolt kapcsolata.
          </Heading>
        </Box>
      </Center>
    );
  };

  return (
    <>
      <AppBar navigation={props.navigation} screenTitle="Alap állapot" />
      <ImageBackground
            source={require('../assets/HatterAllo.png')}
            resizeMode="cover"
            style={{flex: 1, justifyContent: "space-evenly"}}
        >
          {!torolt && mennyi === null && <BetoltesVan captionText="Keresés" />}
          {!torolt && mennyi > 0 && <MennyiKapcsolatVan />}
          {torolt && <OkeNyugta szoveg={'Alap állapot vissza állt'} />}
          {!torolt && mennyi === 0 && <NullaKapcsolatVan />}
      </ImageBackground>
    </>
  );
};
