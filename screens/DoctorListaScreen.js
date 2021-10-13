import React, { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
//import memoize from "fast-memoize";

import { AppState } from "react-native";
import {
  useDisclose,
  View,
  Box,
  HStack,
  Actionsheet,
  Text,
  Divider,
  VStack,
  Center,
  IconButton,
  Icon,
  PresenceTransition,
  Flex,
  Circle,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import {
  Dimensions,
  TouchableHighlight,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { SERVER_URL } from "@env";

import { torolQrCodot } from "../shared/alapEljarasok";
import { fetchListaDate, fetchListaKerdesek } from "../shared/AxiosKeresek";
import { renderListFooter } from "../components/ListFooter";
import { setSzerverAllapot } from "../shared/AxiosKeresek";
import { GlobalContext } from "../shared/ListaContext";

const { width } = Dimensions.get("window");

const createFigyeleztetes = (onDelete, item) =>
  Alert.alert("Figyelmeztetés", "Törli a kapcsolatot?", [
    {
      text: "Mégsem",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Törlés",
      onPress: () => {
        onDelete(item.id);
      },
    },
  ]);

function DoctorListaScreen({ navigation, route }) {
  const { listData, deleteQrCard, getAdatLista } =
    React.useContext(GlobalContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedItem, setSelectedItem] = useState(undefined);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  setSzerverAllapot();

  //alvó állapotból
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive/) && nextAppState === "active") {
        //console.log("App has come to the foreground!");
        getAdatLista();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log("AppState", appState.current);
    });

    return subscription?.remove();
  }, []);

  /*
  let memoizedCb = React.useCallback(
    memoize((param) => () => someFunction(param)),
    []
  );
*/
  const onRefresh = React.useCallback(async () => {
    try {
      if (refreshing) return;
      getAdatLista().then(() => {
        setRefreshing(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const onDeleteKapcsolat = (aktId) => {
    //Tárolásból törli
    torolQrCodot(aktId);
    //listából törli
    deleteQrCard(aktId);
  };

  const onItemPressed = (item) => {
    setSelectedItem(item);
    //console.log("Item pressed", item.paciensNev);
  };

  const onQrCodeElfogadMenuItemHandler = async () => {
    //console.log(selectedItem);
    //navigationRef.current?.navigate("QrCodeElfogad", { hederName: "Módosít" });
    navigation.navigate("QrCodeElfogad", {
      hederName: "Módosít",
      adat: selectedItem,
    });
  };

  const IdopontKeres = async () => {
    let objectConstructor = {}.constructor;
    let datumtomb = await fetchListaDate(selectedItem.id);
    //console.log('Navigáció értéke', datumtomb);
    /*console.log(
      'Navigáció értéke',
      datumtomb.constructor === objectConstructor,
    );*/
    if (datumtomb.constructor === objectConstructor) {
      navigation.navigate("DatumUzenetek", { uzenet: datumtomb });
    } else {
      let kerdestomb = await fetchListaKerdesek(selectedItem.id);
      if (kerdestomb) {
        navigation.navigate("KerdesekLista", {
          adat: selectedItem,
          tomb: kerdestomb,
        });
      } else {
        navigation.navigate("DatumListaValasztas", { adat: selectedItem });
      }
    }
  };

  const onIdopontMenuItemHandler = async () => {
    onClose;
    //navigationRef.current?.navigate("IdopontKeres");
    /*navigation.navigate("DatumLista", {
      screen: 'KerdesekLista',
      params: adat });*/
    //var stringConstructor = "test".constructor;
    //var arrayConstructor = [].constructor;
    //console.log(selectedItem)
    /*
    navigation.navigate('DatumUzenetek', {
      uzenet: {
        "key": "2021-11-02T00:00:00.000+01:00",
        "label": "2021-11-02T00:00:00.000+01:00",
        "uzenet": "Időpontja",
      }
    });
    return
    */
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
      } else IdopontKeres();
    });
  };

  const FoglalasiIdopont = ({ fogIdopont }) => {
    return (
      <Center my={4} alignItems="center">
        {fogIdopont.label !== "" && (
          <Box
            _text={{
              fontSize: "md",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Időpontja:
          </Box>
        )}

        <Box
          _text={{
            fontSize: "md",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {fogIdopont.label === "" ? fogIdopont.uzenet : fogIdopont.label}
        </Box>
      </Center>
    );
  };

  const Kozlemeny = ({ kozlemeny }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    //console.log("Közlemény", kozlemeny)
    return (
      <>
        <Flex alignItems="center" mt={3} ml={3}>
          <Circle size={[6, 8]}>
            <IconButton
              icon={
                <Icon
                  size="lg"
                  color="#fecdd3"
                  as={<Ionicons name="information-circle-outline" />}
                  onPress={() => setIsOpen(!isOpen)}
                />
              }
            />
          </Circle>
        </Flex>
        <PresenceTransition
          visible={isOpen}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          <Box
            p={4}
            _text={{
              fontSize: "md",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {kozlemeny}
          </Box>
        </PresenceTransition>
      </>
    );
  };
  /*
  const Kozlemeny = ({kozlemeny}) => {
    //console.log("Közlemény", kozlemeny)
    return (
      <Center my={4} alignItems="center">
        <Box
          p={4}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          {kozlemeny}
        </Box>
      </Center>
    );
  };
  */

  /*
  <ImageBackground
          rounded="lg"
          source={require("../assets/HatterFekvo.png")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center", margin: 7 }}
        >
  */
  const renderItem = ({ item, index }) => {
    //console.log('RENDERER ITEM', item.kozlemeny);
    return (
      <TouchableHighlight
        onPress={() => {
          onOpen();
          onItemPressed(item);
        }}
      >
        <Box
          width={width - 19}
          justifyContent="flex-start"
          key={index}
          mb={1}
          mx={2}
          borderWidth={1}
          rounded="xl"
          bg={{
            linearGradient: {
              colors: ["#B5D275", "#0F5538", "#001216"],
              start: [0, 0.1],
              end: [0, 1],
            },
          }}
        >
          <Box>
            <VStack marginLeft={3}>
              <Box>
                <Center
                  _text={{
                    fontSize: "2xl",
                    fontWeight: "extrabold",
                    color: "white",
                  }}
                >
                  {item.paciensNev}
                </Center>
              </Box>
              <Center width="100%" alignItems="center">
                <Text fontSize={15} color="white">
                  {item.szulDatum}
                </Text>
              </Center>
              <Divider bg="#FFFFFF" size={3} ml={4} width="86%" marginY={1} />
              <Box>
                <Center
                  _text={{
                    fontSize: "2xl",
                    fontWeight: "extrabold",
                    color: "white",
                  }}
                >
                  {item.orvos}
                </Center>
              </Box>
              {item.kozlemeny && <Kozlemeny kozlemeny={item.kozlemeny} />}
              <Center>
                <Text fontSize={18} marginTop="2" color="white">
                  {item.szerep}
                </Text>
              </Center>
              <HStack>
                {(item.cimke !== "") &&<Text fontSize={18} color="white">
                  {item.cimke}
                </Text>}
              </HStack>
            </VStack>
          </Box>
          {item.fogIdopont !== null && (
            <>
              <Divider bg="#FFFFFF" size={3} ml={7} width="83%" marginTop={3} />
              <FoglalasiIdopont fogIdopont={item.fogIdopont} />
            </>
          )}
        </Box>
      </TouchableHighlight>
    );
  };
  //
  //<Kozlemeny kozlemeny={item.kozlemeny} id={item.id} />
  return (
    <>
      <View>
        <Actionsheet isOpen={isOpen} onClose={onClose} bg="#166534">
          <Actionsheet.Content bg="#166534">
            <Actionsheet.Item
              bg="#65a30d"
              _text={{
                color: "white",
              }}
              onPress={() => {
                onClose();
                onIdopontMenuItemHandler();
              }}
              startIcon={
                <Icon
                  as={<Ionicons name="calendar-outline" />}
                  color="#fafafa"
                  mr={3}
                />
              }
            >
              Időpontkérés
            </Actionsheet.Item>
            <Actionsheet.Item
              bg="#65a30d"
              my={4}
              _text={{
                color: "white",
              }}
              onPress={() => {
                onClose();
                onQrCodeElfogadMenuItemHandler();
              }}
              startIcon={
                <Icon
                  as={<Ionicons name="create-outline" />}
                  color="#fafafa"
                  mr={3}
                />
              }
            >
              Szerkesztés
            </Actionsheet.Item>
            <Actionsheet.Item
              bg="#65a30d"
              _text={{
                color: "white",
              }}
              onPress={() => {
                onClose();
                createFigyeleztetes(onDeleteKapcsolat, selectedItem);
              }}
              mb={10}
              startIcon={
                <Icon
                  as={<Ionicons name="ios-trash-bin-outline" />}
                  color="#fafafa"
                  mr={3}
                />
              }
            >
              Törlés
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={() => (
            <Center flex={1} margin={5}>
              <Center
                bg="lime.700"
                _text={{
                  margin: 3,
                  fontSize: ["16px", "20px", "30px"],
                  color: "white",
                  fontWeight: "bold",
                }}
                height={[300, 600]}
                width={["200px", "500px", "700px"]}
              >
                Kérem, olvassa be az orvosától kapott Regisztrációs adatlapon
                található QR kódot a jobb felső sarokban található fényképezőgép
                ikon segítségével.
              </Center>
            </Center>
          )}
        />
      </View>
    </>
  );
}
export default DoctorListaScreen;
