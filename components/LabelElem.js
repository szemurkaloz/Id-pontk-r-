import React from "react";
import { HStack, Text, Flex, Link, Box, Center } from "native-base";

export const LabelElem = ({ title }) => {
  return (
    <Box marginLeft={6}
        _text={{
          fontSize: "2xl",
          fontWeight: "extrabold",
          color: "white",
        }}
      >
        {title}
    </Box>
  );
};
