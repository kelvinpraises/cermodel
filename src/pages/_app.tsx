import type { AppProps } from "next/app";
import { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { ModalProvider } from "../state/modal";
import { SchemaProvider } from "../state/schema";
import GlobalStyle from "../styles/global";
import { darkTheme, lightTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const ModalState = useMemo(() => {
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

  const SchemaState = useMemo(() => {
    const db = true;
    let state: SchemaState;

    if (db) {
      state = [];
    } else {
      state = [];
    }

    return state;
  }, []);

  const [theme] = useState("dark");

  return (
    <ModalProvider initialState={ModalState}>
      <SchemaProvider initialState={SchemaState}>
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
