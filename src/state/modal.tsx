import { createContext, useReducer } from "react";

const reducer: ModalReducer = (state: ModalInitialState, action: any) => {
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

export const ModalContext = createContext<any>(undefined);

export const ModalProvider: React.FC<ModalProvider> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
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
