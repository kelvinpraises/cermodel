import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state, action) => {
  let newState: SchemaState;
  let index;

  switch (action.type) {
    case schemaActions.CREATE_SCHEMA:
      newState = {
        activeId: action.payload.schema!.id,
        schemas: [action.payload.schema!, ...state.schemas],
      };
      break;

    case schemaActions.UPDATE_SCHEMA_DETAILS:
      index = state.schemas.findIndex(
        (e) => e.id === action.payload.schema!.id
      );

      state.schemas[index] = action.payload.schema!;

      [state.schemas[0], state.schemas[index]] = [
        state.schemas[index],
        state.schemas[0],
      ];

      newState = {
        activeId: action.payload.schema!.id,
        schemas: state.schemas,
      };
      break;

    case schemaActions.UPDATE_SCHEMA:
      console.log(action.payload.id);
      index = state.schemas.findIndex((e) => e.id === action.payload.id);

      if (index) {
        newState = { ...state };
        console.log("error");
      }

      state.schemas[index] = {
        ...state.schemas[index],
        schema: action.payload.schemaDraft!,
      };

      newState = { ...state };
      break;

    case schemaActions.DELETE_SCHEMA:
      if (state.activeId === action.payload.schema!.id) state.activeId = "";

      state.schemas = state.schemas.filter(
        (e) => e.id !== action.payload.schema!.id
      );

      newState = { ...state };
      break;

    default:
      newState = { ...state };
      break;
  }

  console.log(newState);

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
  UPDATE_SCHEMA_DETAILS: "UPDATE_SCHEMA_DETAILS",
  UPDATE_SCHEMA: "UPDATE_SCHEMA",
  DELETE_SCHEMA: "DELETE_SCHEMA",
};
