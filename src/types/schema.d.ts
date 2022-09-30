interface SchemaState {
  activeId: string;
  schemas: Schema[];
}

interface Schema {
  id: string;
  schema: string;
  schemaDetails: {
    name: string;
    description: string;
    schemaAlias: string;
    definitionAlias: string;
  };
  borderColor: string;
}

interface SchemaAction {
  type: any;
  payload?: Schema;
}

interface SchemaProvider {
  children: React.ReactNode;
  initialState: SchemaState;
}

type SchemaReducer = (state: SchemaState, action: SchemaAction) => SchemaState;
