import { useContext } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";
import SaveChange from "./SaveChange";
import Text from "./Text";

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

const SchemaModal = () => {
  const {
    state: { showSchemaDetails },
    dispatch,
  } = useContext(ModalContext) as {
    state: ModalState;
    dispatch: any;
  };

  if (!showSchemaDetails) {
    return null;
  }

  return (
    <SModal onClick={() => dispatch({ type: modalActions.CLOSE_SCHEMA_MODAL })}>
      <SSchema onClick={(e) => e.stopPropagation()}>
        <SHeader>
          <Text type="h5">Schema Details</Text>
          <Simg
            onClick={() => dispatch({ type: modalActions.CLOSE_SCHEMA_MODAL })}
            src="close.svg"
            alt=""
          />
        </SHeader>
        <SBody>
          <STitle>Name</STitle>
          <SInput></SInput>
          <STitle>Description</STitle>
          <SInput></SInput>
          <STitle>Schema Alias</STitle>
          <SInput></SInput>
          <STitle>Definition Alias</STitle>
          <SInput></SInput>
        </SBody>
        <SaveChange />
      </SSchema>
    </SModal>
  );
};

export default SchemaModal;
