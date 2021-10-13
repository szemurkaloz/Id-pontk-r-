import React from "react";
import { Modal, Button } from "native-base";
import { useState, forwardRef, useImperativeHandle } from "react";
import { OkeNyugta } from "./OkeNyugta";

const FoglalasValasz = ({navigation}, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [szerverValasz, setSzerverValasz] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showServerValasz(valasz) {
          setSzerverValasz(valasz);
          setShowModal(true);
      },
    }),
    []
  );

  const Elutasitva = () => {
    return (
      <>
        <Modal.Body>
          Sajnáljuk, időközben valaki lefoglalta ezt az időpontot! Kérem lépjen
          vissza az előző oldalra és válasszon egy másik időpontot.
        </Modal.Body>
        <Modal.Footer>Köszönöm megértését.</Modal.Footer>
      </>
    );
  };
/*
<View mt={10}>
            <OkeNyugta />
          </View>
*/
  const Sikeres = () => {
    return (
      <>
        <Modal.Body>
          Sikeres időpontfoglalás.
        </Modal.Body>
      </>
    );
  };

  return ( 
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Üzenet</Modal.Header>
          {szerverValasz ? <Elutasitva /> : <Sikeres />}
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  setShowModal(false);
                  //Sikeres foglalás esetén
                  if(!szerverValasz) {
                    navigation.navigate("Home");
                  }
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default forwardRef(FoglalasValasz);
