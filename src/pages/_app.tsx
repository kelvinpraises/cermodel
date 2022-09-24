import type { AppProps } from "next/app";
import { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { ModalProvider } from "../state/modal";
import { SchemaProvider } from "../state/schema";
import GlobalStyle from "../styles/global";
import { darkTheme, lightTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const modalInitialState = useCallback(() => {
    const newUser = false;

    let state: ModalInitialState;
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

  const schemaInitialState = useCallback(() => {
    const db = true;
    let state: SchemaInitialState;

    if (db) {
      state = [];
    } else {
      state = [];
    }

    return state;
  }, []);

  const [theme] = useState("dark");

  return (
    <ModalProvider initialState={modalInitialState()}>
      <SchemaProvider initialState={schemaInitialState()}>
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Scaffold>
            <Component {...pageProps} />
          </Scaffold>
        </ThemeProvider>
      </SchemaProvider>
    </ModalProvider>
  );
}

export default MyApp;
