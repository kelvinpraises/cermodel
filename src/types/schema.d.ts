type SchemaInitialState = {
  schema: string;
  schemaDetails: SchemaDetails;
}[];

interface SchemaDetails {
  name: string;
  description: string;
  schemaAlias: string;
  definitionAlias: string;
}

interface SchemaProvider {
  children: React.ReactNode;
  initialState: SchemaInitialState;
}

type SchemaReducer = (
  state: SchemaInitialState,
  action: any
) => SchemaInitialState;
