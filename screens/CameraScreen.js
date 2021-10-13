import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  HStack,
  View,
  Center,
  Circle,
  IconButton,
  Icon,
  Alert,
  Box,
  Button,
  Flex,
} from 'native-base';
import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useIsFocused} from '@react-navigation/native';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import {keresKeyInKeys} from '../shared/alapEljarasok';

const RoszKodUzenet = `Nem jó formátum!
Ellenőrizd, hogy a jó QR kódot olvasod-e be.`;
const IsmetlesiUzenet = `Ez a QR kód tartalom,
már szerepel a tárolt adatok között.`;

const Figyelmeztetes = ({onClosed, setClose, fejlec, uzenet}) => {
  return (
    <Box w="100%">
      <Alert
        status="warning"
        w="100%"
        action={() => {
          onClosed();
        }}>
        <Alert.Icon size={['sm', 'md', 'xl']} />
        <Alert.Title>{fejlec}</Alert.Title>
        <Alert.Description
          _text={{
            fontSize: ['md', 'lg', '3xl'],
            color: 'black',
            fontWeight: 'bold',
          }}>
          {uzenet}
        </Alert.Description>
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <Icon
                size={['md', 'lg', 'xl']}
                as={<Ionicons name="close" />}
                color="black"
                onPress={() => {
                  setClose();
                }}
              />
            }
          />
        </HStack>
      </Alert>
    </Box>
  );
};

const Uzenet = ({uzenetText, onHandleEngedely}) => {
  return (
    <Center flex={1}>
      <Center
        _text={{
          fontWeight: 'bold',
        }}
        height={200}
        width={{
          base: 200,
          lg: 400,
        }}>
        {uzenetText}
      </Center>
      <Button
          my={8}
          w={[100, 270]}
          _text={{
            fontSize: ['sm', 'md', 'lg'],
            color: 'black',
            fontWeight: 'bold',
          }}
          colorScheme="green"
          onPress={() => onHandleEngedely()}>
          ok megad
        </Button>
    </Center>
  );
};

export default function CameraScreen({navigation: {navigate}}) {
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();
  const [sound, setSound] = useState(undefined);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState('off');
  const [badHashFormat, setBadHashFormat] = useState(false);
  const [ismeteltId, setIsmeteltId] = useState(false);

  useEffect(() => {
    onSetEngedely();
  }, []);

  const onSetEngedely = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
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
        justifyContent="center"  
        alignItems="center"
    >
      <Center
         _text={{
          margin: 3,
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        }}
        height={200}
        width={{
          base: 200,
          lg: 400,
        }}>
        Nincs megadva az engedély a kamera használathoz.
      </Center>
    </Flex>
    );
  }

  async function playSound() {
    // eslint-disable-next-line no-shadow
    const {sound} = await Audio.Sound.createAsync(
      require('../assets/sound/camera-click.wav'),
    );
    setSound(sound);

    await sound.playAsync();
  }

  const BeolvasGomb = () => {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="flex-end"
        mb={10}
        opacity={badHashFormat ? 0.5 : 1.0}>
        <TouchableOpacity
          onPress={() => {
            if (badHashFormat) {
              return;
            }
            setScanned(true);
            playSound();
          }}>
          <Circle size={70} bg="secondary.400">
            <Icon
              as={<MaterialIcons name="qr-code-2" />}
              color="white"
              size={10}
            />
          </Circle>
        </TouchableOpacity>
      </View>
    );
  };

  const readQRCode = obj => {
    if (!scanned || badHashFormat) {
      return;
    }

    setFlashMode('off');

    const patt =
      '^[0-9]{4}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}#.+$';

    if (!obj.data.match(patt)) {
      setBadHashFormat(true);
      setScanned(true);
      return;
    }

    const scannedData = obj.data.split('#');
    //Kulcs ismétlés keresése id === key
    keresKeyInKeys(scannedData[0]).then(value => {
      //console.log("Ismetles:", value)
      if (value === undefined) {
        let adat = {
          key: null,
          id: scannedData[0],
          paciensNev: scannedData[1],
          szulDatum: scannedData[2],
          orvos: scannedData[3],
          szerep: scannedData[4],
          fogIdopont: null,
          kozlemeny: null
        };
        //console.log('Beolvasott qrqode: ', scannedData);
        navigate('QrCodeElfogad', {adat});
      } else {
        setIsmeteltId(true);
        setScanned(true);
        return;
      }
    });
  };

  const onIsmeteltAlertClosed = () => {
    setScanned(false);
    setIsmeteltId(false);
  };

  const AlertClose = () => {
    setScanned(false);
    setBadHashFormat(false);
  };

  return (
    isFocused && (
      <View style={styles.container}>
        {badHashFormat && (
          <Figyelmeztetes
            setClose={AlertClose}
            fejlec="Hiba!"
            uzenet={RoszKodUzenet}
          />
        )}
        {ismeteltId && (
          <Figyelmeztetes
            setClose={onIsmeteltAlertClosed}
            fejlec="Hiba!"
            uzenet={IsmetlesiUzenet}
          />
        )}

        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={readQRCode}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          flashMode={flashMode}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <BeolvasGomb />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    //flexDirection: 'row',
    margin: 20,
  },
  button: {
    //flex: 0.1,
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});