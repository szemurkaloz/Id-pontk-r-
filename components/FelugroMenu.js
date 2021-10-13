import React, { createRef } from "react";
import {
  View,
  Box,
  IconButton,
  Stagger,
  Pressable,
  VStack,
  Divider,
  HamburgerIcon,
  Center,
  Icon,
  Menu,
  Text,
} from "native-base"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import {
  OverlayContainer,
  OverlayView,
  useOverlayPosition,
} from "@react-native-aria/overlays";
import { useNavigation } from '@react-navigation/native';
import { fetchListaDate, fetchListaKerdesek } from "../shared/AxiosKeresek";

const FelugroMenu = ({ triggerRef, placement }) => {
  let overlayRef = React.useRef();

  const { overlayProps } = useOverlayPosition({
    placement,
    targetRef: triggerRef,
    overlayRef,
    offset: 50,
  });

  return (
    <View
      style={{
        position: "absolute",
        ...overlayProps.style,
      }}
      ref={overlayRef}
    >
      <Box
        alignItems="center" minH={220}
      >
        <Stagger
          visible={true}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={30} name="clock-time-five-outline" />}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={30} name="account-edit-outline" />}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={30} name="delete-outline" color="red" />}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={30} name="close-circle-outline" />}
          />
        </Stagger>
      </Box>
    </View>
  );

}

export const TriggerButton = ({ placement }) => {
  let triggerRef = React.useRef();
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <VStack alignItems="center"
      bg="rose.50" >
      <Center size={16} mt={6}>
        <Pressable
          px={4}
          ml='auto'
          onPress={toggleVisible}
          ref={triggerRef}
          accessibilityRole="button"
          accessibilityLabel="Click here to open an overlay"
        >
          <Icon as={<Ionicons name="menu" />} color='black' />
        </Pressable>
        {visible && (
          <OverlayContainer>
            <FelugroMenu triggerRef={triggerRef} placement={placement} />
          </OverlayContainer>
        )}
      </Center>
    </VStack>
  );
}

const GoToScreen = ({ butonText, navCel, onClose }) => {

  return (
    <Pressable
      p={4}
      borderWidth={1}
      _light={{
        borderColor: "dark.200",
      }}
      _dark={{
        borderColor: "dark.600",
      }}
      name="IdopontKeres"
      onPress={() => {
        onClose();
        
      }}
    >
      <Text>
        {butonText}
      </Text>
    </Pressable>
  )
}
//navigation.navigate("IdopontKeres")

export const DoctorListaMenu = ({ onDeleteRow, data, rowMap }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigation = useNavigation();
  const adat = data.item;

  const onCloseHandler = () => {
    //onClose();
    setIsOpen(!isOpen);
    //console.log("isOpen: " + isOpen);
  }

  const onIdopontMenuItemHandler = async () => {
    //navigationRef.current?.navigate("IdopontKeres");
    /*navigation.navigate("DatumLista", { 
      screen: 'KerdesekLista',
      params: adat });*/
      //var stringConstructor = "test".constructor;
      //var arrayConstructor = [].constructor;
      let objectConstructor = ({}).constructor;
      let datumtomb = await fetchListaDate(adat.id)
      //console.log("Navigáció értéke", datumtomb)
      //console.log("Navigáció értéke", datumtomb.constructor === objectConstructor)
      if(datumtomb.constructor === objectConstructor) navigation.navigate("DatumUzenetek", {uzenet: datumtomb});
      else {
        let kerdestomb = await fetchListaKerdesek(adat.id)
        if(kerdestomb) navigation.navigate("KerdesekLista", {adat: adat, tomb: kerdestomb});
        else navigation.navigate("DatumListaValasztas", {adat: adat});
      }
     /* */
  }

  const onQrCodeElfogadMenuItemHandler = () => {
    //navigationRef.current?.navigate("QrCodeElfogad", { hederName: "Módosít" });
    navigation.navigate("QrCodeElfogad", { hederName: "Módosít", adat } );
  }

  return (
    <VStack
      alignItems="center"
      bg="rose.50"
      height="100%"
      justifyContent="center"
    >
      <Center size={16}>
        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon />
              </Pressable>
            );
          }}
        >
          <Menu.Item
            _text={{ color: "green.500" }}
            onPress={() => onIdopontMenuItemHandler()}
          >
            Időpont kérés
          </Menu.Item>
          <Menu.Item onPress={() => onQrCodeElfogadMenuItemHandler()}>
            Szerkesztés
          </Menu.Item>
          <Divider />
        </Menu>
      </Center>
    </VStack>
  );
}


//onPress={onToggle}

// return (
//   <Box h="100%" >
//     <Box alignItems="flex-end" minH={100} mr={6} mt={270} >
//       <Stagger 
//         visible={true}
//         initial={{
//           opacity: 0,
//           scale: 0,
//           translateY: 34,
//         }}
//         animate={{
//           translateY: 0,
//           scale: 1,
//           opacity: 1,
//           transition: {
//             type: "spring",
//             mass: 0.8,
//             stagger: {
//               offset: 30,
//               reverse: true,
//             },
//           },
//         }}
//         exit={{
//           translateY: 34,
//           scale: 0.5,
//           opacity: 0,
//           transition: {
//             duration: 100,
//             stagger: {
//               offset: 30,
//               reverse: true,
//             },
//           },
//         }}
//       >
//         <IconButton
//           mb={4}
//           variant="solid"
//           rounded="full"
//           icon={<MaterialCommunityIcons size={24} name="share" />}
//         />
//         <IconButton
//           mb={4}
//           variant="solid"
//           rounded="full"
//           icon={<MaterialCommunityIcons size={24} name="heart" />}
//         />
//         <IconButton
//           mb={4}
//           variant="solid"
//           rounded="full"
//           icon={<MaterialCommunityIcons size={24} name="library" />}
//         />
//         <IconButton
//           mb={4}
//           variant="solid"
//           rounded="full"
//           icon={<MaterialCommunityIcons size={24} name="lighthouse" />}
//         />
//       </Stagger>
//     </Box>
//     <Box position="relative" h={100} w="100%">
//     <Fab
//       onPress={onToggle}
//       position="absolute"
//       size="sm"
//       icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
//     />
//   </Box>
//   </Box> 
// ); 


