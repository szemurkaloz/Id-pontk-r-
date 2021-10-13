import React from 'react';
import {Flex} from 'native-base';

import {KetSorosUzenet} from '../components/KetSorosUzenet';

export const DatumUzenetekScreen = ({route}) => {
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
        justifyContent="flex-start"  
    >
      <KetSorosUzenet adat={route.params.uzenet} />
    </Flex>
  );
};
