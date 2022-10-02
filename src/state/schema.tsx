import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state, action) => {
  let newState: SchemaState;
  let index;
  let name;
  let value;

  switch (action.type) {
    case schemaActions.CREATE_SCHEMA:
      newState = {
        activeId: action.payload.schema!.id,
        schemas: [action.payload.schema!, ...state.schemas],
      };
      break;

    case schemaActions.REPLACE_SCHEMA:
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

    case schemaActions.DELETE_SCHEMA:
      if (state.activeId === action.payload.id) state.activeId = "";

      state.schemas = state.schemas.filter((e) => e.id !== action.payload.id);

      newState = { ...state };
      break;

    case schemaActions.UPDATE_BORDER_COLOR:
      index = state.schemas.findIndex((e) => e.id === action.payload.id);

      console.log(action.payload.borderColor!);

      state.schemas[index] = {
        ...state.schemas[index],
        borderColor: action.payload.borderColor!,
      };

      newState = { ...state };
      break;

    case schemaActions.UPDATE_DRAFT:
      index = state.schemas.findIndex((e) => e.id === action.payload.id);
      name;

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

    case schemaActions.CHANGE_INPUT:
      index = state.schemas.findIndex((e) => e.id === action.payload.id);
      name = action.payload.name!;
      value = action.payload.value!;

      state.schemas[index] = {
        ...state.schemas[index],
        schemaDetails: {
          ...state.schemas[index].schemaDetails,
          [name]: value,
        },
      };

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
  UPDATE_BORDER_COLOR: "UPDATE_BORDER_COLOR",
  REPLACE_SCHEMA: "REPLACE_SCHEMA",
  UPDATE_DRAFT: "UPDATE_DRAFT",
  CHANGE_INPUT: "CHANGE_INPUT",
  DELETE_SCHEMA: "DELETE_SCHEMA",
};
