
import React from "react";
import axios from 'axios';
import Parser from 'fast-xml-parser';
import {SERVER_URL, TESZTSERVER_URL} from '@env';
import array from 'lodash/array';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import {useNetInfo} from "@react-native-community/netinfo";
import {Alert} from "react-native";
import {
  getUserInfoEnvelop,
  getKerdesekEnvelop,
  getDateListEnvelope,
  getTimeListEnvelop,
  getFoglalasEnvelop,
  xmlOptionsV1,
  xmlOptionsV2,
  getAktHeader,
  USER_INFO,
  KERDESEK,
  DATUM_LIST,
  IDOPONT_LIST,
  FOGLALAS,
} from './getServDateList';

import {unEscapeHTML} from './getServDateList';
import {olvasdAllQrCodot} from './alapEljarasok';
/*
axios.interceptors.request.use(function (config) {
 
  config.metadata = { startTime: new Date()}
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
 
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, function (error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  return Promise.reject(error);
});
*/

export const DatumUzenetek = datum => {
  //console.log('Dátumot alakítod üzenetté:',datum)
  if (datum === null) {
    return null;
  }
  if (datum === undefined) {
    return undefined;
  }
  const d = new Date(datum);

  if (d.getFullYear() !== 1900) {
    //Ha a időpont T00:00:00.000+01:00
    //Nincs időpont1 1638313200000
    let time = d.toTimeString().slice(0,8);
    //console.log('Nincs időpont1',time)
    if (time === "00:00:00"){
      //console.log('Nincs időpont2')
      return [datum]; 
    }
    return {
      key: datum,
      label: moment(d).format('YYYY.MM.DD. HH:mm'),
      uzenet: 'Önnek már van előjegyzett időpontja',
    };
  }

  switch (d.getDate()) {
    case 1:
      // 1900-01-01
      return {
        key: datum,
        label: '',
        uzenet: 'Frissítenie kell az új verzióra.',
      };
    case 2:
      // 1900-01-02
      return {key: datum, label: '', uzenet: 'Nincs elérhető szabad időpont.'};
    case 3:
      // 1900-01-03
      return {key: datum, label: '', uzenet: 'Elnézést, de ön le van tiltva.'};
  }
  //console.log(result)
  return null;
};

export const fetchUsernakUzenet = async aktId => {
  return axios
    .post(`${getSzerverUrl(aktId)}`, getUserInfoEnvelop.replace('KULCSOK', aktId), {
      headers: getAktHeader(USER_INFO),
    })
    .then(response => {
      try {
        //console.log('data: ', unEscapeHTML(response.data))
        //console.log("DOKTOR_UZENET",response.duration)
        var tObj = Parser.getTraversalObj(
          unEscapeHTML(response.data),
          xmlOptionsV2,
        );
        var x = Parser.convertToJson(tObj, xmlOptionsV2);
        //console.log(x);
        var item =
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:GetUserInfoResponse']
            .return;
        //console.log("Usernak üzenet:", item)
        //console.log("Válasz után: ", item === 0);
        //console.log("Usernak üzenet értéke:", typeof item === "string");
        if (typeof item === 'string' && item !== '') {
          return item;
        }
        if (typeof item === 'string' && item === '') {
          return null;
        }
        //if ((typeof (item) === "string") && item === "") { return "Nincs értesítés." }
      } catch (error) {
        //console.log(error.message);
      }
      //console.log(response);
      //setPost(response.data);
    });
};

export const fetchListaKerdesek = async aktId => {
  //'9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-C9CE58F8-76DF-4AEF-8030-718A54A25F60'
  //console.log(aktId);
  //aktId = '9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-56AEABEF-666E-41AA-89E2-685290914354'
  return axios
    .post(`${getSzerverUrl(aktId)}`, getKerdesekEnvelop.replace('KULCSOK', aktId), {
      headers: getAktHeader(KERDESEK),
    })
    .then(response => {
      try {
        //console.log("KERDESEK",response.duration)
        //console.log('data: ', unEscapeHTML(response.data))
        var tObj = Parser.getTraversalObj(
          unEscapeHTML(response.data),
          xmlOptionsV1,
        );
        var x = Parser.convertToJson(tObj, xmlOptionsV1);
        //console.log(`KÉRDÉSEK: ${JSON.stringify(x, null, 2)}`)
        //console.log(`KÉRDÉSEK:`, x);
        if (
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:GetKerdesekResponse']
            .return.FDBS === undefined
        ) {
          return null;
        }
        let kerdesek = [];
        const t =
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:GetKerdesekResponse']
            .return.FDBS.Manager.TableList.Table.RowList.Row;
        for (let i = 0; i < t.length; i++) {
          kerdesek.push({
            id: i.toString(),
            question: t[i].Original.attr['@_c_Kerdes'],
            status: false,
          });
          //kerdesek.map(c => console.log(c));
        }
        //kerdesek.map(c => console.log(c));
        return kerdesek;
        //setKerdesekTomb(kerdesek);
        //console.log(`KÉRDÉSEK: ${JSON.stringify(kerdesek, null, 2)}`);
      } catch (error) {
        console.log(error.message);
      }
    });
};

export const fetchListaDate = async aktId => {
  //'9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-C9CE58F8-76DF-4AEF-8030-718A54A25F60'
  //'9912-14ACC9FA-A63F-4F0B-AD2F-3808DCAA3DE4-A6AD43AF-4AD5-42DE-857E-4F04E8FF3022#A Zerős Elemér#1985-05-06#Kovács József#orvos
  //console.log('Lekért ID!:',aktId);
  //console.log('SERVER_URL!:',getSzerverUrl(aktId));
  return axios
    .post(`${getSzerverUrl(aktId)}`, getDateListEnvelope.replace('KULCSOK', aktId), {
      headers: getAktHeader(DATUM_LIST),
    })
    .then(response => {
      try {
        //console.log("DATUM_LIST",response.duration)
        var tObj = Parser.getTraversalObj(response.data, xmlOptionsV1);
        var x = Parser.convertToJson(tObj, xmlOptionsV1);
        var items =
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:GetDateListResponse']
            .return;
        //console.log('SOAPRESZPONSE: ' + JSON.stringify(x['SOAP-ENV:Envelope']['SOAP-ENV:Body']["NS1:GetDateListResponse"]))
        if (items === '') {
          //console.log('Nincs közzétett időpont!');
          //setdatumTomb(null);
          //setIsValid(false);
          return null;
        }
        if (!Array.isArray(items.item)) {
          //Nincs array csak egy dátum
          //console.log('foglalt ido item: ',items)
          console.log('foglalható napok vagy nap: ',items.item)
          //setdatumTomb(items.item);
          //setIsValid(false);
          //console.log('foglalt ido: ',DatumUzenetek(items.item))
          //Ha csak egy foglalható nap van akkor nem tömböt kapok vissza
          //"key": "2021-12-01T00:00:00.000+01:00",
          //időpontot kell ellenőriznem Dátum üzenetekbe átrakom tömbe ha foglalható nap
          let eredmeny = DatumUzenetek(items.item);
          let objectConstructor = {}.constructor;
          if (eredmeny.constructor === objectConstructor) {
            return eredmeny;
          }else {items.item = eredmeny}
        }
        //Ismétlések kiszűrése
        let tomb = array.uniqBy(items.item);
        //console.log(tomb)
        //Formátum átalakítása
        tomb = tomb.map(
          c => (c = {key: c, label: moment(c).format('YYYY.MM.DD. HH:mm')}),
          //console.log(JSON.stringify(c))
        );
        //setdatumTomb(tomb);
        return tomb;
        //tomb.map(c => console.log(JSON.stringify(c)))
      } catch (error) {
        console.log(error.message);
      }
    });
};

export const fetchListaIdo = async (aktId, datum) => {
  //'9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-C9CE58F8-76DF-4AEF-8030-718A54A25F60'
  //console.log('IDŐPONTOTT KÉR: ', datum)
  return axios
    .post(
      `${getSzerverUrl(aktId)}`,
      getTimeListEnvelop
        .replace('KULCSOK', aktId)
        .replace('FOGLALASDATUMA', datum.key),
      {
        headers: getAktHeader(IDOPONT_LIST),
      },
    )
    .then(response => {
      //console.log(`RESPONSE ${JSON.stringify(response)}`)
      try {
        //console.log("IDOPONT_LIST",response.duration)
        var tObj = Parser.getTraversalObj(response.data, xmlOptionsV1);
        var x = Parser.convertToJson(tObj, xmlOptionsV1);
        //console.log('SOAPRESZPONSE: ' + JSON.stringify(x))
        var items =
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:GetTimeListResponse']
            .return;
        if (items === '') {
          //console.log('Nincs közzétett óra-perc!');
          //setIdoTomb(null);
          //setIsValid(false);
          return null;
        }
        if (Array.isArray(items.item)) {
          //Ismétlések kiszűrése
          let tomb = array.uniqBy(items.item);
          //tomb.map((v) => {console.log('tömbitem:', v)})
          //Formátum átalakítása
          tomb = tomb.map(
            c => (c = {key: c, label: moment(c).format('HH:mm')}),
          );
          return tomb; /*setIdoTomb(tomb);*/
        } else {
          //let tomb = new Array(items.item);
          console.log('Egy időpont: ', JSON.stringify(new Array(items.item)));
          let tomb = [items.item];
          tomb = tomb.map(
            c => (c = {key: c, label: moment(c).format('YYYY.MM.DD.')}),
          );
          return tomb; //setIdoTomb(tomb);
        }
        //tomb.map((c) => console.log(JSON.stringify(c)));
      } catch (error) {
        console.log(error.message);
      }
      //console.log(response);
      //setPost(response.data);
    });
};

export const fetchDatumLefoglalas = async (aktId, fogIdo, uzenet) => {
  //'9912-6E4F1680-909A-4ED4-946F-0CCB4CA37559-C9CE58F8-76DF-4AEF-8030-718A54A25F60'
  //"2021-08-09T09:00:00.000+02:00"
  //console.log("IDŐPONT", fogIdo.key);
  return axios
    .post(
      `${getSzerverUrl(aktId)}`,
      getFoglalasEnvelop.replace('KULCSOK', aktId)
      .replace('IDOPONT', fogIdo)
      .replace('UZENET', uzenet),
      {
        headers: getAktHeader(FOGLALAS),
      },
    )
    .then(response => {
      //console.log(`RESPONSE ${JSON.stringify(response)}`)
      try {
        var tObj = Parser.getTraversalObj(response.data, xmlOptionsV2);
        var x = Parser.convertToJson(tObj, xmlOptionsV2);
        console.log(response.data);
        var item =
          x['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS1:FoglalasResponse']
            .return;
        //console.log(item)
        //console.log("Válasz után: ", item === 0);
        //setFoglalasBefejezve(item !== 0);
        //modalShowRef.current.showServerValasz(item === 0);
        //Foglalásnál megelőztek 0 kapsz vissza
        return item;
      } catch (error) {
        console.log(error.message);
      }
      //console.log(response);
      //setPost(response.data);
    });
};

export async function fetchTaroltListaData() {
  let idLista = await olvasdAllQrCodot();
  //console.log(JSON.stringify(idLista,null,2))
  //value.concat(fakeDoctorlist)
  //setListData(fakeDoctorlist);
  if (idLista === undefined) {
    return;
  } 
  
  idLista.map((x) => {
    x["fogIdopont"] = null;
    x["kozlemeny"] = null;
  });

  for (let index = 0; index < idLista.length; index++) {
    let element = idLista[index];
    //console.log("RESULT",element)
    if (element && element.id !== '') {
      let result = await fetchServerData(element.id);
      //console.log('RESULT', result);
      element.fogIdopont = result.datuma;
      element.kozlemeny = result.kozlemeny;
    } else {
      element.fogIdopont = null;
      element.kozlemeny = null;
    }
  }
  //console.log("Szerver lekérdezése", idLista.length)
  //idLista.map((x) => console.log(x))
  return idLista;
}

const fetchServerData = async id => {
  //console.log('Value id:', id);
  let result = {datuma: null, kozlemeny: null};
  let value = await fetchListaDate(id);
  if (Array.isArray(value)) {
    //console.log("idoAllapot value:",value)
    result.datuma = null;
  } else {
    //Mindenkép frissíteni kell az előző nem maradhat
    result.datuma = value;
  }
  //console.log("idoAllapot:",idoAllapot)
  value = await fetchUsernakUzenet(id);
  if (value !== '') {
    result.kozlemeny = value;
  } else {
    //Mindenkép frissíteni kell az előző nem maradhat
    result.kozlemeny = null;
  }

  return result;
};

export function setSzerverAllapot () {
  const netInfo = useNetInfo({
    reachabilityUrl: SERVER_URL,
    reachabilityTest: async (response) => response.status === 204,
    reachabilityLongTimeout: 60 * 1000, // 60s
    reachabilityShortTimeout: 5 * 1000, // 5s
    reachabilityRequestTimeout: 15 * 1000, // 15s
  });
    
}

function getSzerverUrl (azonosito) {
  //liszencszám leválasztása
  const str = azonosito.slice(0,4);
  //console.log('SLTesztICE',TESZTSERVER_URL);
  //console.log('SLICE',str);
  if(str === "9912") return TESZTSERVER_URL
  return SERVER_URL
}
