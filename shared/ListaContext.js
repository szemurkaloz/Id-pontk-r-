import React, {useState, useEffect, useRef} from 'react';

import {SERVER_URL} from '@env';
import {DatumUzenetek} from './AxiosKeresek';
import {fetchUsernakUzenet, fetchListaDate} from './AxiosKeresek';
import {fetchTaroltListaData} from './AxiosKeresek';

/*
const fakeDoctorlist = [
  {
    "fogIdopont": {
      "key": "2021-11-02T08:20:00.000+01:00",
      "label": "",
      "uzenet": "Nincs elérhető szabad időpont.",
    },
    "id": "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    "key": "9912-536E8127-AF30-4E7F-A10A-623F81E14AB6-76D06771-872F-48AF-BAFC-25819937B0A5",
    "kozlemeny": undefined,
    "orvos": "Mónika PKPlus",
    "paciensNev": "3 Év Alatti Gyermek",
    "szerep": "orvos",
    "szulDatum": "2018-01-31",
  },
  {
    "fogIdopont": {
      "key": "1900-01-02T00:00:00.000+01:00",
      "label": "",
      "uzenet": "Nincs elérhető szabad időpont.",
    },
    "id": "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
    "key": "9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-3C1B5B34-D61A-44CA-96BD-64719D54F1AD",
    "kozlemeny": "x",
    "orvos": "Dr Főorvos Kiss Bogácsa Pál Bogárzó",
    "paciensNev": "3 Év Alatti Gyermek",
    "szerep": "orvos",
    "szulDatum": "2018-01-31",
  },
  {
    "fogIdopont": null,
    "id": "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
    "key": "9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354",
    "kozlemeny": "x",
    "orvos": "Dr Valaki Nagy",
    "paciensNev": "Remete Pál",
    "szerep": "orvos",
    "szulDatum": "2018-01-31",
  },
];
*/

export const GlobalContext = React.createContext();

export const GlobalProvider = props => {
  //const navigation = useNavigation();

  /* ENVIRONMENT API URL */
  const [listData, setListData] = useState([]);
  /*const netInfo = useNetInfo({
    reachabilityUrl: SERVER_URL,
    reachabilityTest: async (response) => response.status === 204,
    reachabilityLongTimeout: 60 * 1000, // 60s
    reachabilityShortTimeout: 5 * 1000, // 5s
    reachabilityRequestTimeout: 15 * 1000, // 15s
  });*/

  //A listából is lehet frissítést kérni
  useEffect(() => {
    //console.log('Lista adatok lekérese Contextben');
    getAdatLista();
  }, []);

  const getAdatLista = async () => {
    fetchTaroltListaData().then((value) =>
    {
      //console.log("useEfect",value)
      setListData(value);
    }
      
    );
    //setListData(fakeDoctorlist);
  };

  const addNewQrCard = newCard => {
    const getAdatFromSzerver = async () => {
      newCard.kozlemeny = await fetchUsernakUzenet(newCard.id).then(x => {
        return x !== '' ? x : null;
      });

      //console.log("addNewQrCard", newCard['kozlemeny'])

      newCard.fogIdopont = await fetchListaDate(newCard.id).then(x => {
        return x !== '' ? x : null;
      });

      //console.log("addNewQrCard", newCard['fogIdopont'])

      //console.log("EDITCARD", newCard)

      setListData(prevLista => [...prevLista, newCard]);
    };
    getAdatFromSzerver();
  };

  const editQrCard = editCard => {
    console.log("EDITCARD", editCard);
    setListData((prevLista) =>
      prevLista.map(card => {
        //console.log("szerver fogidőpontok: ", allapot);
        return card.id === editCard.id
          ? {
              ...card,
              cimke: editCard.cimke,
              fogIdopont: editCard.fogIdopont,
            }
          : card;
      })
    );
  };

  const getIdopontQrCard = (cardId, datum) => {
    let datumUzenet = DatumUzenetek(datum);
    //console.log('EDITCARD DatumÜzenet', datumUzenet);
    setListData(prevLista =>
      prevLista.map(card => {
        //console.log("szerver fogidőpontok: ", allapot);
        return card.id === cardId
          ? {
              ...card,
              fogIdopont: datumUzenet,
            }
          : card;
      }),
    );
  };

  const deleteQrCard = cardId => {
    console.log('EDITCARD DatumÜzenet', cardId);
    setListData(listData.filter(item => item.id !== cardId));
  };

  const deleteAllQrCard = () => {
    setListData([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        listData,
        addNewQrCard,
        editQrCard,
        getIdopontQrCard,
        deleteQrCard,
        deleteAllQrCard,
        getAdatLista,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};