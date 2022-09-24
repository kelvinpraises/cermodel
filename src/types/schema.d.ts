type SchemaState = {
  id: string;
  schema: string;
  schemaDetails: SchemaDetails;
  borderColor: string;
}[];

interface SchemaDetails {
  name: string;
  description: string;
  schemaAlias: string;
  definitionAlias: string;
}

interface SchemaProvider {
  children: React.ReactNode;
  initialState: SchemaState;
}

type SchemaReducer = (
  state: SchemaState,
  action: any
) => SchemaState;
