import { createContext, useReducer } from "react";

export const ModalContext = createContext<any>(undefined);

export const ModalProvider: React.FC<ModalProvider> = ({
  children,
  reducer,
  initialState,
}) => {
  return (
    <ModalContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ModalContext.Provider>
  );
};

export const modalActions = {
  OPEN_SETTING_MODAL: "OPEN_SETTING_MODAL",
  CLOSE_SETTING_MODAL: "CLOSE_SETTING_MODAL",

  OPEN_WELCOME_MODAL: "OPEN_WELCOME_MODAL",
  CLOSE_WELCOME_MODAL: "CLOSE_WELCOME_MODAL",

  OPEN_ZEN_MODE_MODAL: "OPEN_ZEN_MODE_MODAL",
  CLOSE_ZEN_MODE_MODAL: "CLOSE_ZEN_MODE_MODAL",

  OPEN_SCHEMA_MODAL: "OPEN_SCHEMA_MODAL",
  CLOSE_SCHEMA_MODAL: "CLOSE_SCHEMA_MODAL",

  OPEN_DOWNLOAD_MODAL: "OPEN_DOWNLOAD_MODAL",
  CLOSE_DOWNLOAD_MODAL: "CLOSE_DOWNLOAD_MODAL",
};
