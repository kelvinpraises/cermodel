interface SettingsState {
  didSeedKey: string;
  ceramicNode: string;
  serverEndpoint: string;
  autoAssignBorderColor: boolean;
  enableAdvancedView: boolean;
}

interface SettingsProvider {
  children: React.ReactNode;
  initialState: SettingsState;
}

interface SettingsPayload {
  name?: "didSeedKey" | "ceramicNode" | "serverEndpoint";
  value?: string;
  state?: SettingsState;
}

interface SettingsAction {
  type: any;
  payload: SettingsPayload;
}

type SettingsReducer = (
  state: SettingsState,
  action: SettingsAction
) => SettingsState;
