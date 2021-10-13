import React from "react";
import { HStack, Center, Spinner, Heading, Text } from "native-base";

export const BetoltesVan = ({ captionText }) => {
  return (
    <Center flex={1}>
      <HStack space={4}>
        <Heading color="primary.300">{captionText}</Heading>
        <Spinner accessibilityLabel="BeolvasĂˇs" />
      </HStack>
    </Center>
  );
};

export const ValaszIsNull = ({ captionText, messageText }) => {
  return (
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
      {captionText}
      {messageText}
    </Center>
  );
};

/*
<Center flex={1}>
      <HStack space={4}>
        <Heading color="primary.300">{captionText}</Heading>
        <Text>{messageText}</Text>
      </HStack>
    </Center>
*/
