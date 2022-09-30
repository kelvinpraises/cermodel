interface ModalState {
  showSettings: boolean;
  showWelcome: boolean;
  showZenMode: boolean;
  showCreateSchema: boolean;
  showUpdateSchema: boolean;
  showDownload: boolean;
}

interface ModalProvider {
  children: React.ReactNode;
  initialState: ModalState;
}

type ModalReducer = (state: ModalState, action: any) => ModalState;
