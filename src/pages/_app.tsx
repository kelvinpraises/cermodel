import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import { modalActions, ModalProvider } from "../state/modal";
import GlobalStyle from "../styles/global";
import { darkTheme, lightTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  // Checks if use is logged in for the first time
  useEffect(() => {
    return () => {};
  }, []);

  const modalInitialState = {
    showSettings: false,
    showWelcome: false,
    showZenMode: false,
    showSchemaDetails: false,
    showDownload: false,
  };

  const modelReducer: ModelReducer = (
    state: ModalInitialState,
    action: any
  ) => {
    let type: ModalInitialState;
    switch (action.type) {
      case modalActions.OPEN_SETTING_MODAL:
        type = {
          ...state,
          showSettings: true,
        };
        break;
      case modalActions.CLOSE_SETTING_MODAL:
        type = {
          ...state,
          showSettings: false,
        };
        break;

      case modalActions.OPEN_WELCOME_MODAL:
        type = {
          ...state,
          showWelcome: true,
        };
        break;
      case modalActions.CLOSE_WELCOME_MODAL:
        type = {
          ...state,
          showWelcome: false,
        };
        break;

      case modalActions.OPEN_ZEN_MODE_MODAL:
        type = {
          ...state,
          showZenMode: true,
        };
        break;
      case modalActions.CLOSE_ZEN_MODE_MODAL:
        type = {
          ...state,
          showZenMode: false,
        };
        break;

      case modalActions.OPEN_SCHEMA_MODAL:
        type = {
          ...state,
          showSchemaDetails: true,
        };
        break;
      case modalActions.CLOSE_SCHEMA_MODAL:
        type = {
          ...state,
          showSchemaDetails: false,
        };
        break;

      case modalActions.OPEN_DOWNLOAD_MODAL:
        type = {
          ...state,
          showDownload: true,
        };
        break;
      case modalActions.CLOSE_DOWNLOAD_MODAL:
        type = {
          ...state,
          showDownload: false,
        };
        break;

      default:
        type = state;
    }
    return type;
  };

  const [theme] = useState("dark");

  return (
    <ModalProvider reducer={modelReducer} initialState={modalInitialState}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Scaffold>
          <Component {...pageProps} />
        </Scaffold>
      </ThemeProvider>
    </ModalProvider>
  );
}

export default MyApp;
