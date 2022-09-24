import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { ModalProvider } from "../state/modals";
import { SchemasProvider } from "../state/schemas";
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

  const SchemasState = useMemo(() => {
    const db = true;
    let state: SchemasState;

    if (db) {
      state = { activeId: "", schemas: [] };
    } else {
      state = { activeId: "", schemas: [] };
    }

    return state;
  }, []);

  const [theme] = useState("dark");

  return (
    <ModalProvider initialState={ModalState}>
      <SchemasProvider initialState={SchemasState}>
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Scaffold>
            <Component {...pageProps} />
          </Scaffold>
        </ThemeProvider>
      </SchemasProvider>
    </ModalProvider>
  );
}

export default MyApp;
