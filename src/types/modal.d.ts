interface ModalInitialState {
  showSettings: boolean;
  showWelcome: boolean;
  showZenMode: boolean;
  showSchemaDetails: boolean;
  showDownload: boolean;
}

interface ModalProvider {
  children: React.ReactNode;
  initialState: ModalInitialState;
}

type ModalReducer = (
  state: ModalInitialState,
  action: any
) => ModalInitialState;
