import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { ModalProvider } from "../state/modal";
import { SchemaProvider } from "../state/schema";
import { SettingsProvider } from "../state/setting";
import GlobalStyle from "../styles/global";
import { darkTheme, lightTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const modalState = useMemo(() => {
    const newUser = false;

    let state: ModalState;
    const data = {
      showSettings: false,
      showWelcome: false,
      showZenMode: false,
      showCreateSchema: false,
      showUpdateSchema: false,
      showDownload: false,
    };

    if (newUser) {
      state = { ...data, showWelcome: true };
    } else {
      state = {
        ...data,
      };
    }

    return state;
  }, []);

  const schemasState = useMemo(() => {
    const db = true;
    let state: SchemaState;

    if (db) {
      state = { activeId: "", schemas: [] };
    } else {
      state = { activeId: "", schemas: [] };
    }

    return state;
  }, []);

  const settingsState = {
    didSeedKey: "",
    ceramicNode: "https://ceramic-clay.3boxlabs.com",
    serverEndpoint: "https://glossy-bald-diver.glitch.me/deploy-models",
    autoAssignBorderColor: true,
    enableAdvancedView: false,
  };

  const [theme] = useState("dark");

  return (
    <ModalProvider initialState={modalState}>
      <SettingsProvider initialState={settingsState}>
        <SchemaProvider initialState={schemasState}>
          <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Scaffold>
              <Component {...pageProps} />
            </Scaffold>
          </ThemeProvider>
        </SchemaProvider>
      </SettingsProvider>
    </ModalProvider>
  );
}

export default MyApp;
