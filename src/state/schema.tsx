import { createContext, useReducer } from "react";

const reducer = (state: SchemaState, action: SchemaAction) => {
  let newState: SchemaState;
  switch (action.type) {
    case schemaActions.SET_ID:
      newState = {
        ...state,
        id: action.idPayload!,
      };
      break;

    case schemaActions.SET_BORDER_COLOR:
      newState = {
        ...state,
        borderColor: action.borderPayload!,
      };
      break;

    case schemaActions.CHANGE_INPUT:
      newState = {
        ...state,
        schemaDetails: {
          ...state.schemaDetails,
          [action.inputPayload!.name]: action.inputPayload!.value,
        },
      };
      break;

    case schemaActions.PUT_STATE:
      newState = action.schemaPayload!;
      break;

    case schemaActions.CLEAR_STATE:
      newState = {
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
      break;

    default:
      newState = state;
      break;
  }
  return newState;
};

export const SchemaContext = createContext<any>(undefined);

export const SchemaProvider: React.FC<SchemaProvider> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SchemaContext.Provider value={{ state, dispatch }}>
      {children}
    </SchemaContext.Provider>
  );
};

export const schemaActions = {
  SET_ID: "SET_ID",
  SET_BORDER_COLOR: "SET_BORDER_COLOR",
  CHANGE_INPUT: "CHANGE_INPUT",
  PUT_STATE: "PUT_STATE",
  CLEAR_STATE: "CLEAR_STATE",
};
