import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state: SchemaState, action: any) => {
  let newState: SchemaState;

  switch (action.type) {
    case schemaActions.CREATE_SCHEMA:
      // Adds a new schema to the state
      // Makes the schema active
      newState = { ...state };
      break;

    case schemaActions.UPDATE_SCHEMA:
      // Updates a schema in the state
      // Makes the schema active
      newState = { ...state };
      break;

    case schemaActions.DELETE_SCHEMA:
      // Deletes a schema from the state
      newState = { ...state };
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
  CREATE_SCHEMA: "CREATE_SCHEMA",
  UPDATE_SCHEMA: "UPDATE_SCHEMA",
  DELETE_SCHEMA: "DELETE_SCHEMA",
};
