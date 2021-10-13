import React, { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Center,
  VStack,
  HStack,
  Button,
  Heading,
  Flex,
  useTheme,
  ScrollView,
} from "native-base";
import {
  BackHandler,
  Platform,
  Alert,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";

import { GlobalContext } from "../shared/ListaContext";
import FoglalasValasz from "../components/ServerValaszok";
import { CommonActions } from "@react-navigation/native";
import { fetchDatumLefoglalas } from "../shared/AxiosKeresek";

const ValasztottIdopont = ({ time }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ width: 250 }}>
      <VStack space={4} alignItems="center">
        <Heading color="white">Foglalás</Heading>
        <HStack>
          <Text
            fontSize={{ base: "md", md: "3xl", lg: "5xl" }}
            fontWeight="bold"
            color="white"
          >
            Időpontja
          </Text>
        </HStack>
      </VStack>
      <Center
        mt={5}
        bg="#65a30d"
        rounded="md"
        _text={{
          fontSize: ["md", "3lg", "5xl"],
          color: "red.900",
          fontWeight: "bold",
        }}
        shadow={3}
        h={[10, 24, 40]}
      >
        {moment(time).format("YYYY.MM.DD HH:mm")}
      </Center>
    </View>
  );
};

export const IdopontKeresScreen = ({ route, navigation }) => {
  //const { isLoading, data } = useFetch('http://192.168.2.94:3000/list-categories');
  const [foglalasBefejezve, setFoglalasBefejezve] = useState(false);
  const { getIdopontQrCard } = React.useContext(GlobalContext);
  const { colors } = useTheme();
  const modalShowRef = useRef(null);
  let navigHome = false;
  let uzenetOrvosnak = "";

  //props.route.params.adat.Key

  useFocusEffect(
    useCallback(() => {
      //console.log(`Atat ami lekérsz ${JSON.stringify(route.params.adat.id)}`)
      return () => {
        setFoglalasBefejezve(false);
        //navigHome= false;
        //console.log('FoglalasBefejezve false');
      };
    }, [])
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Ha sikeres a mentés csak haza tudjon menni
      //console.log("Navig home:", navigation)
      if (navigHome) {
        e.preventDefault();
        navigation.dispatch((state) => {
          const routes = [{ name: "Home" }, ...state.routes];
          return CommonActions.reset({
            ...state,
            routes: routes,
            index: 0,
          });
        });
      }
    });
    return unsubscribe;
  }, [navigHome, navigation]);

  React.useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        navigation.navigate("Home");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

  const onSaveIdopont = () => {
    //console.log("SZERVEREN FOGLALAS :" + fogIdo);
    //console.log("SZERVEREN FOGLALAS :2021-08-09T09:00:00.000+02:00");
    //0 = nem sikerült a foglalás megelőztek
    //console.log("SZERVEREN FOGLALAS :" + fogIdo);
    /*
    //szerver nélküli próba
    navigHome = true;
    setFoglalasBefejezve(true);
    modalShowRef.current.showServerValasz(false);
    return; 
    */
    fetchDatumLefoglalas(
      route.params.adat.id, 
      route.params.datum.key,
      uzenetOrvosnak).then(
      (x) => {
        //console.log("Foglalás Válasz", x)
        navigHome = x !== 0;
        setFoglalasBefejezve(x !== 0);
        //Menteni a listába az állapotot
        if (x !== 0) {
          getIdopontQrCard(route.params.adat.id, route.params.datum.key);
        }
        modalShowRef.current.showServerValasz(x === 0);
      }
    );
  };

  function vanSzerverKapcsolat() {
    NetInfo.fetch().then((state) => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "Figyelmeztetés",
          "Net kapcsolat megszakadt a szerverrel.",
          [
            {
              text: "Ok",
            },
          ]
        );
      } else onSaveIdopont();
    });
  }

  const setUzenetOrvosnak = (value) =>{
    uzenetOrvosnak = value;
  };

  const UzenetText = ({handledUzenet}) => {
    const [uzenetValue, setUzenetValue] = useState("");

    const onChange = (v) => {
      setUzenetValue(v);
      handledUzenet(v);
    };

    return (
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        placeholder="Üzenet az orvosnak"
        onChangeText={(value) => onChange(value)}
        value={uzenetValue}
        maxLength={70}
      />
    );
  };
 
  return (
    // eslint-disable-next-line react-native/no-inline-styles
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
            behavior={Platform.OS === "ios" ? "position" : "position"}
          >
            <Center mt={30}>
              <ValasztottIdopont time={route.params.datum.key} />
              <UzenetText handledUzenet={setUzenetOrvosnak} />
              {!foglalasBefejezve && (
                <Button
                  my={8}
                  w={[100, 270]}
                  _text={{
                    fontSize: ["sm", "md", "lg"],
                    color: "white",
                    fontWeight: "bold",
                  }}
                  colorScheme="emerald"
                  bg="#006600"
                  onPress={() => vanSzerverKapcsolat()}
                >
                  Mentés
                </Button>
              )}
              <FoglalasValasz ref={modalShowRef} navigation={navigation} />
            </Center>
          </KeyboardAvoidingView>
        </ScrollView>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    width: "90%",
    color: "black",
    borderWidth: 1,
    backgroundColor: "#e6ffe6",
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
    height: 150,
  },
});
