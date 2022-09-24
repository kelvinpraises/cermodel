import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state: SchemaState, action: any) => {
  let newState: SchemaState;

  switch (action.type) {
    case schemaActions.ADD_NEW_SCHEMA:
      // creates a new shcema and makes it active
      // makes the schema active
      newState = { ...state };
      break;

    case schemaActions.DELETE_SCHEMA:
      // Deletes a schema from the state
      newState = { ...state };
      break;

    case schemaActions.MAKE_SCHEMA_ACTIVE:
      // Makes a schema in the state active
      newState = { ...state };
      break;

    default:
      newState = { ...state };
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
  ADD_NEW_SCHEMA: "ADD_NEW_SCHEMA",
  DELETE_SCHEMA: "DELETE_SCHEMA",
  MAKE_SCHEMA_ACTIVE: "MAKE_SCHEMA_ACTIVE",
};
