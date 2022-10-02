import { ChangeEvent, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../../state/modal";
import { schemaActions, SchemaContext } from "../../state/schema";
import { SettingsContext } from "../../state/setting";
import copyTextToClipboard from "../../utils/copyTextToClipboard";
import jsonFormatter from "../../utils/jsonFormatter";
import jsonSyntaxHighlight from "../../utils/jsonSyntaxHighlight";
import Text from "../Text";
import axios from "axios";

interface ISchemaDetails {
  schema: Schema;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

interface IModelAliasViewer {
  title: string;
  jsonObj: any;
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

const Sp2 = styled.p`
  color: ${({ theme }) => theme.text3};
  text-align: center;
  line-height: 2rem;
`;

const SSchemaDetailsBox = styled.div<{ color: string }>`
  width: 30rem;
  height: 34rem;
  background-color: black;
  border: ${({ color }) => `3px solid ${color}`};
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

const SBoxTitleHover = styled(SBoxTitle)`
  :hover {
    color: ${({ theme }) => theme.accent2};
    cursor: pointer;
  }
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

const SModelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  min-height: 10rem;
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

const SModalBoxContent = styled.pre`
  overflow: scroll;
  color: white;

  .string {
    color: #98d698;
  }
  .number {
    color: #d88827;
  }
  .boolean {
    color: #d88827;
  }
  .null {
    color: #d88827;
  }
  .key {
    color: #89d6ff;
  }
`;

const Simg = styled.img`
  transition: 100ms;
  :hover {
    transform: scale(1.05);
  }
`;

const SEmptyState = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 75%;
`;

const DownloadModel = () => {
  const { modalState, modalDispatch } = useContext(ModalContext) as {
    modalState: ModalState;
    modalDispatch: any;
  };

  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  const handleClose = useCallback(() => {
    modalDispatch({ type: modalActions.CLOSE_DOWNLOAD_MODAL });
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      console.log(e.target.name, e.target.value);

      schemaDispatch({
        type: schemaActions.CHANGE_INPUT,
        payload: {
          id,
          name: e.target.name,
          value: e.target.value,
        } as SchemaPayload,
      });
    },
    []
  );

  if (!modalState.showDownload) {
    return null;
  }

  return (
    <SModal onClick={handleClose}>
      <SSchema onClick={(e) => e.stopPropagation()}>
        <SHeader>
          <Text type="h5">Model</Text>
          <Simg onClick={handleClose} src="close.svg" alt="" />
        </SHeader>
        <SBody>
          {schemaState.schemas.length === 0 ? (
            <SEmptyState>
              <Sp2>Please Create A Schema To Start Deploying</Sp2>
            </SEmptyState>
          ) : (
            <>
              <SSchemaDetails>
                <Sp>Schema Details</Sp>
                {schemaState.schemas.map((schema) => (
                  <SchemaDetails
                    key={schema.id}
                    schema={schema}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </SSchemaDetails>
              <SRunDeploy>
                <RunDeploy />
              </SRunDeploy>
            </>
          )}
        </SBody>
      </SSchema>
    </SModal>
  );
};

const SchemaDetails: React.FC<ISchemaDetails> = ({
  schema,
  handleInputChange,
}) => {
  console.log(schema);

  return (
    <SSchemaDetailsBox color={schema.borderColor}>
      <SSchemaHeader>{schema?.schemaDetails?.schemaAlias}</SSchemaHeader>
      <SBoxTitle>Name</SBoxTitle>
      <SInput
        type="text"
        value={schema.schemaDetails.name}
        onChange={(e) => handleInputChange(e, schema.id)}
        name="name"
        autoComplete="off"
      />
      <SBoxTitle>Description</SBoxTitle>
      <SInput
        type="text"
        value={schema.schemaDetails.description}
        onChange={(e) => handleInputChange(e, schema.id)}
        name="description"
        autoComplete="off"
      />
      <SBoxTitle>Schema Alias</SBoxTitle>
      <SInput
        type="text"
        value={schema.schemaDetails.schemaAlias}
        onChange={(e) => handleInputChange(e, schema.id)}
        name="schemaAlias"
        autoComplete="off"
      />
      <SBoxTitle>Definition Alias</SBoxTitle>
      <SInput
        type="text"
        value={schema.schemaDetails.definitionAlias}
        onChange={(e) => handleInputChange(e, schema.id)}
        name="definitionAlias"
        autoComplete="off"
      />
    </SSchemaDetailsBox>
  );
};

const RunDeploy = () => {
  const [modelState, setModelState] = useState({
    loading: false,
    data: [],
  });

  const { schemaState } = useContext(SchemaContext) as {
    schemaState: SchemaState;
  };

  const { settingsState } = useContext(SettingsContext) as {
    settingsState: SettingsState;
  };

  const { didSeedKey, ceramicNode, serverEndpoint } = settingsState;

  const { modalDispatch } = useContext(ModalContext) as {
    modalDispatch: any;
  };

  const handleModelDeploy = useCallback(async () => {
    setModelState((prev) => {
      return { ...prev, loading: true };
    });

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const modelDetails = schemaState.schemas.map((e) => {
      const { schema, schemaDetails: details } = e;
      const { name, description, definitionAlias, schemaAlias } = details;

      return {
        schema,
        name,
        description,
        schemaAlias,
        definitionAlias,
      };
    });

    let bodyContent = JSON.stringify({
      didSeedKey,
      ceramicNode,
      modelDetails,
    });

    let reqOptions = {
      url: serverEndpoint,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    setModelState({ loading: false, data: response.data });
  }, []);

  const handleShowSettings = useCallback(() => {
    modalDispatch({
      type: modalActions.CLOSE_DOWNLOAD_MODAL,
    });
    modalDispatch({
      type: modalActions.OPEN_SETTING_MODAL,
    });
  }, []);

  return (
    <SRunDeployBox>
      <Sp>Run Deploy</Sp>

      <SModelBox onClick={handleShowSettings} style={{ cursor: "pointer" }}>
        <SBoxTitle>
          DID Seed Key: <span style={{ color: "white" }}>{didSeedKey}</span>
        </SBoxTitle>
        <SBoxTitle>
          Ceramic Node: <span style={{ color: "white" }}>{ceramicNode}</span>
        </SBoxTitle>
        <SBoxTitle>
          Server Endpoint:{" "}
          <span style={{ color: "white" }}>{serverEndpoint}</span>
        </SBoxTitle>
      </SModelBox>

      <DeployButton onClick={handleModelDeploy}>
        <ButtonText>
          {modelState.loading ? "Processing..." : "DEPLOY"}
        </ButtonText>
      </DeployButton>

      {modelState.data.length > 0 && (
        <>
          <Sp>Model Aliases</Sp>

          {modelState.data.map((e, i) => {
            const title = Object.keys((e as any).schemas)[0];

            return <ModelAliasViewer key={i} title={title} jsonObj={e} />;
          })}
        </>
      )}
    </SRunDeployBox>
  );
};

const ModelAliasViewer: React.FC<IModelAliasViewer> = ({ title, jsonObj }) => {
  const [copyText, setCopyText] = useState("COPY");

  const handleCopyText = useCallback(async (jsonObj: any) => {
    try {
      await copyTextToClipboard(jsonFormatter({ jsonObj }));
      setCopyText("COPIED");
      setTimeout(() => {
        setCopyText("COPY");
      }, 1000);
    } catch (error) {
      console.error("error");
    }
  }, []);

  return (
    <SModelBox>
      <SModelHead>
        <SBoxTitle>{title}</SBoxTitle>
        <SBoxTitleHover onClick={async () => await handleCopyText(jsonObj)}>
          {copyText}
        </SBoxTitleHover>
      </SModelHead>
      <SModalBoxContent
        dangerouslySetInnerHTML={{
          __html: jsonSyntaxHighlight(jsonFormatter({ jsonObj })),
        }}
      />
    </SModelBox>
  );
};

export default DownloadModel;
