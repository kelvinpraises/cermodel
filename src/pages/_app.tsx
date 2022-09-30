import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { ModalProvider } from "../state/modal";
import { SchemaProvider } from "../state/schema";
import { SchemasProvider } from "../state/schema";
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
      showSchemaDetails: false,
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
    let state: SchemasState;

    if (db) {
      state = { activeId: "", schemas: [] };
    } else {
      state = { activeId: "", schemas: [] };
    }

    return state;
  }, []);

  const schemaState = {
    id: "",
    schema: "",
    schemaDetails: {
      name: "",
      description: "",
      schemaAlias: "",
      definitionAlias: "",
    },
    borderColor: "",
  };

  const settingsState = {
    didSeedKey: "",
    ceramicNode: "",
    serverEndpoint: "",
  };

  const [theme] = useState("dark");

  return (
    <ModalProvider initialState={modalState}>
      <SettingsProvider initialState={settingsState}>
        <SchemasProvider initialState={schemasState}>
          <SchemaProvider initialState={schemaState}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
              <GlobalStyle />
              <Scaffold>
                <Component {...pageProps} />
              </Scaffold>
            </ThemeProvider>
          </SchemaProvider>
        </SchemasProvider>
      </SettingsProvider>
    </ModalProvider>
  );
}

export default MyApp;
