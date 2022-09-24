import { useContext } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";
import Text from "./Text";

interface ModelBoxProps {
  height: string;
}

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
  width: 68rem;
  background: ${({ theme }) => theme.modal};
  border-radius: 1.5rem;
  height: 90vh;
  position: relative;
`;

const SHeader = styled.div`
  height: 5rem;
  width: 68rem;
  padding: 2rem;
  border-bottom: 1.5px solid #1d2231;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SBody = styled.div`
  height: calc(90vh - 5rem);
  /* padding: 0 2rem; */
  display: flex;
`;

const SSchemaDetails = styled.div`
  width: 34rem;
  border-right: 1.5px solid #1d2231;
  height: inherit;
  overflow-y: auto;
  padding: 0 2rem;
  /* background-color: red; */
`;

const SRunDeploy = styled.div`
  width: 34rem;
  padding: 0 2rem;
  overflow-y: auto;
  /* background-color: red; */
`;

const Sp = styled.p`
  color: ${({ theme }) => theme.text2};
  font-size: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const SSchemaDetailsBox = styled.div`
  width: 30rem;
  height: 34rem;
  background-color: black;
  border: 3px solid #9b33c3;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const SSchemaHeader = styled.p`
  color: ${({ theme }) => theme.text1};
  font-size: 1.5rem;
  padding-bottom: 3rem;
`;

const SBoxTitle = styled.p`
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  padding-bottom: 0.43rem;
`;

const SInput = styled.input`
  font-family: monospace;
  font-size: 1.125rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.accent1};
  resize: none;
  outline: none;
  width: 100%;
  height: 2.8rem;
  padding: 10px 8px;
  border: none;
  margin-bottom: 2rem;
`;

const SRunDeployBox = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

const DeployButton = styled.div`
  width: 30rem;
  height: 3.125rem;
  border-radius: 5px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.accent2};
  cursor: pointer;
`;

const ButtonText = styled.p`
  font-size: 1.25rem;
`;

const SModelBox = styled.div<ModelBoxProps>`
  width: 30rem;
  height: ${({ height }) => height};
  background-color: black;
  border-radius: 1.25rem;
  padding: 1.25rem;
  margin-bottom: 2rem;
`;

const SModelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Simg = styled.img`
  transition: 100ms;
  :hover {
    transform: scale(1.05);
  }
`;

const DownloadModel = () => {
  const {
    state: { showDownload },
    dispatch,
  } = useContext(ModalContext) as {
    state: ModalState;
    dispatch: any;
  };

  if (!showDownload) {
    return null;
  }

  return (
    <SModal
      onClick={() => dispatch({ type: modalActions.CLOSE_DOWNLOAD_MODAL })}
    >
      <SSchema onClick={(e) => e.stopPropagation()}>
        <SHeader>
          <Text type="h5">Model</Text>
            <Simg
              onClick={() =>
                dispatch({ type: modalActions.CLOSE_DOWNLOAD_MODAL })
              }
              src="close.svg"
              alt=""
            />
        </SHeader>
        <SBody>
          <SSchemaDetails>
            <Sp>Schema Details</Sp>
            <SchemaDetails />
            <SchemaDetails />
          </SSchemaDetails>
          <SRunDeploy>
            <Sp> Run Deploy</Sp>
            <RunDeploy />
          </SRunDeploy>
        </SBody>
      </SSchema>
    </SModal>
  );
};

export default DownloadModel;

const SchemaDetails = () => {
  return (
    <SSchemaDetailsBox>
      <SSchemaHeader>EnvfyProtocolState</SSchemaHeader>
      <SBoxTitle>Name</SBoxTitle>
      <SInput></SInput>
      <SBoxTitle>Description</SBoxTitle>
      <SInput></SInput>
      <SBoxTitle>Schema Alias</SBoxTitle>
      <SInput></SInput>
      <SBoxTitle>Definition Alias</SBoxTitle>
      <SInput></SInput>
    </SSchemaDetailsBox>
  );
};

const RunDeploy = () => {
  return (
    <SRunDeployBox>
      <DeployButton>
        <ButtonText> DEPLOY</ButtonText>
      </DeployButton>
      <Sp>Model Aliases</Sp>
      <SModelBox height={"20.5rem"}>
        <SModelHead>
          <SBoxTitle>All Model Alias</SBoxTitle>
          <SBoxTitle>COPY</SBoxTitle>
        </SModelHead>
      </SModelBox>
      <SModelBox height={"9.7rem"}>
        <SModelHead>
          <SBoxTitle>All Model Alias</SBoxTitle>
          <SBoxTitle>COPY</SBoxTitle>
        </SModelHead>
      </SModelBox>
    </SRunDeployBox>
  );
};
