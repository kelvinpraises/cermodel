import { createContext, useReducer } from "react";

const reducer: SchemaReducer = (state: SchemaInitialState, action: any) => {
  let type: SchemaInitialState;
  switch (action.type) {
    case "":
      type = { ...state };
      break;

    default:
      type = { ...state };
      break;
  }
  return type;
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

export const schemaActions = {};
