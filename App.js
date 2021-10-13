import React from "react";
import { NativeBaseProvider } from "native-base";
import themes from "./constants/themes";
import { GlobalProvider } from "./shared/ListaContext";

import { MainNavigator } from "./navigation/DrawerNavigator";
import { AnimatedAppLoader } from "./screens/SplashScreen";

export default function App() {
  const config = {
    dependencies: {
      "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
  };

  return (
    <NativeBaseProvider theme={themes} config={config}>
      <AnimatedAppLoader image={require("./assets/doctor.png")}>
        <GlobalProvider>
          <MainNavigator></MainNavigator>
        </GlobalProvider>
        </AnimatedAppLoader>
    </NativeBaseProvider>
  );
}
/*
<NativeBaseProvider theme={themes} config={config}>
      <AnimatedAppLoader image={require("./assets/doctor.png")}>
        <GlobalProvider>
          <MainNavigator></MainNavigator>
        </GlobalProvider>
      </AnimatedAppLoader>
    </NativeBaseProvider>
*/