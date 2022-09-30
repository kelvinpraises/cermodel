import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../../state/modal";
import { schemaActions, SchemaContext } from "../../state/schema";
import Text from "../Text";
import SaveChange from "./SaveChange";

const SModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SSchema = styled.div`
  display: flex;
  flex-direction: column;
  width: 27rem;
  background: ${({ theme }) => theme.modal};
  border-radius: 1.5rem;
  height: 37.25rem;
  position: relative;
`;

const SHeader = styled.div`
  height: 5rem;
  width: 27rem;
  padding: 2rem;
  border-bottom: 1.5px solid #1d2231;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SClose = styled.div`
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  transition: 200ms ease-in-out;
  :hover {
    background: ${({ theme }) => theme.accent1};
  }
`;

const SBody = styled.div`
  /* background-color: red; */
  padding: 0 2rem;
  padding-bottom: 7rem;
  overflow-y: auto;
`;

const STitle = styled(Text)`
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  color: ${({ theme }) => theme.text3};
`;

const SInput = styled.input`
  font-family: monospace;
  font-size: 1.125rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.inputField};
  resize: none;
  outline: none;
  width: 100%;
  height: 2.8rem;
  padding: 10px 8px;
  border: none;
`;

const Simg = styled.img`
  transition: 100ms;
  :hover {
    transform: scale(1.05);
  }
`;

const cardColor = ["#34A853", "#1DA1F2", "#9B33C3", "#1877F2", "#0A66C2"];

const initialState = {
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

const SchemaModal = () => {
  const [schemaInputState, setSchemaInputState] = useState(initialState);

  const { modalState, modalDispatch } = useContext(ModalContext) as {
    modalState: ModalState;
    modalDispatch: any;
  };

  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  useEffect(() => {
    const randNum = (x: number) => Math.floor(Math.random() * x);
    const randColor = cardColor[randNum(cardColor.length - 1)];

    setSchemaInputState((prev) => {
      return { ...prev, id: "" + randNum(100000000) };
    });

    setSchemaInputState((prev) => {
      return { ...prev, borderColor: randColor };
    });
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSchemaInputState((prev) => {
      return {
        ...prev,
        schemaDetails: {
          ...prev.schemaDetails,
          [e.target.name]: e.target.value,
        },
      };
    });
  }, []);

  const handleModalClose = useCallback(() => {
    modalDispatch({ type: modalActions.CLOSE_SCHEMA_MODAL });
    setSchemaInputState(initialState);
  }, []);

  const handleSaveChanges = useCallback((state: Schema) => {
    modalDispatch({ type: modalActions.CLOSE_SCHEMA_MODAL });
    setSchemaInputState(initialState);

    const isNewSchema = schemaState.schemas.findIndex((e) => e.id === state.id);

    if (isNewSchema === -1) {
      schemaDispatch({
        type: schemaActions.CREATE_SCHEMA,
        payload: state,
      });
    } else {
      schemaDispatch({ type: schemaActions.UPDATE_SCHEMA });
    }
  }, []);

  const handleReset = useCallback(() => {
    setSchemaInputState(initialState);
  }, []);

  if (!modalState.showSchemaDetails) {
    return null;
  }

  return (
    <SModal onClick={handleModalClose}>
      <SSchema onClick={(e) => e.stopPropagation()}>
        <SHeader>
          <Text type="h5">Schema Details</Text>
          <Simg onClick={handleModalClose} src="close.svg" alt="" />
        </SHeader>

        <SBody>
          <STitle>Name</STitle>
          <SInput
            type="text"
            value={schemaInputState.schemaDetails.name}
            onChange={handleInputChange}
            name="name"
          />
          <STitle>Description</STitle>
          <SInput
            type="text"
            value={schemaInputState.schemaDetails.description}
            onChange={handleInputChange}
            name="description"
          />
          <STitle>Schema Alias</STitle>
          <SInput
            type="text"
            value={schemaInputState.schemaDetails.schemaAlias}
            onChange={handleInputChange}
            name="schemaAlias"
          />
          <STitle>Definition Alias</STitle>
          <SInput
            type="text"
            value={schemaInputState.schemaDetails.definitionAlias}
            onChange={handleInputChange}
            name="definitionAlias"
          />
        </SBody>

        <SaveChange
          state={schemaInputState}
          saveChanges={(state) => handleSaveChanges(state)}
          resetChanges={() => handleReset()}
        />
      </SSchema>
    </SModal>
  );
};

export default SchemaModal;