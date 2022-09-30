import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state, action) => {
  let newState: SchemaState;

  switch (action.type) {
    case schemaActions.CREATE_SCHEMA:
      newState = {
        activeId: action.payload!.id,
        schemas: [action.payload!, ...state.schemas],
      };
      break;

    case schemaActions.UPDATE_SCHEMA:
      const index = state.schemas.findIndex(
        (e) => e.id === action.payload!!.id
      );

      state.schemas[index] = action.payload!;

      [state.schemas[0], state.schemas[index]] = [
        state.schemas[index],
        state.schemas[0],
      ];

      newState = { activeId: action.payload!.id, schemas: state.schemas };
      break;

    case schemaActions.DELETE_SCHEMA:
      if (state.activeId === action.payload!.id) state.activeId = "";

      state.schemas = state.schemas.filter((e) => e.id !== action.payload!.id);

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

  const value = { schemaState: state, schemaDispatch: dispatch };

  return (
    <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>
  );
};

export const schemaActions = {
  CREATE_SCHEMA: "CREATE_SCHEMA",
  UPDATE_SCHEMA: "UPDATE_SCHEMA",
  DELETE_SCHEMA: "DELETE_SCHEMA",
};
