import React from "react";
import { Center } from "native-base";
import moment from 'moment';
import 'moment/locale/hu';

export const KetSorosUzenet = ({ adat }) => {

  moment.locale('hu');

  let datum = moment(adat.key).format('YYYY.MM.DD.')
  let nap = moment(adat.key).locale("hu").format('dddd')
  let ora = moment(adat.key).format('HH:mm')

  return (
    <Center flex={1} marginX={5}>
      <Center
        _text={{
          margin: 3,
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        }}
        height={180}
        width={{
          base: 250,
          lg: 800,
        }}
      >
        {adat.uzenet}
      </Center>
      {adat.label !== "" &&
        <Center
          _text={{
            margin: 3,
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
          }}
          height={180}
          width={{
            base: 250,
            lg: 800,
          }}
        >
          {datum}{ora}{nap} 
        </Center>
      }
    </Center>
  )
}