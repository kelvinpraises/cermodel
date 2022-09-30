import Editor from "@monaco-editor/react";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../public/monaco-theme.json";
import { modalActions, ModalContext } from "../state/modal";
import { schemaActions, SchemaContext } from "../state/schema";
import CreateSchema from "./modals/CreateSchema";

const SEditorRest = styled.div`
  width: 25rem;
  height: 90vh;
  border: ${({ theme }) => `3px dashed ${theme.modal}`};
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SEditor = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 29rem;
  height: 95vh;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.card};
  border: ${({ theme }) => `3px solid ${theme.cardBorder}`};
  overflow-y: auto;
`;

const Sp = styled.p`
  color: ${({ theme }) => theme.text3};
  text-align: center;
`;

const SFloat = styled.div`
  width: 27rem;
  height: 4rem;
  border-radius: 0.75rem;
  position: sticky;
  bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.accent1};
`;

const Sp1 = styled.p`
  color: ${({ theme }) => theme.text3};
`;

const Simg = styled.img`
  margin-left: 1.6rem;
  transition: 250ms ease-out;
  :hover {
    transform: scale(1.1);
  }
`;

const CerEditor = () => {
  const [showEditor, setShowEditor] = useState(false);

  const { modalDispatch } = useContext(ModalContext) as { modalDispatch: any };

  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  useEffect(() => {
    if (schemaState.activeId) setShowEditor(true);
  }, [schemaState]);

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    monaco.editor.defineTheme("my-dark", JSON.parse(JSON.stringify(theme)));
    monaco.editor.setTheme("my-dark");
  }, []);

  const handleEditorChange = useCallback(
    (value: any, event: any) => {
      schemaDispatch({
        type: schemaActions.UPDATE_SCHEMA,
        payload: {
          id: schemaState.activeId,
          schemaDraft: value,
        },
      });
    },
    [schemaState]
  );

  const handleFullScreen = useCallback(() => {
    modalDispatch({ type: modalActions.OPEN_ZEN_MODE_MODAL });
  }, []);

  return (
    <>
      {!showEditor ? (
        <SEditorRest>
          <Sp>Click The Green Button To Start Editing</Sp>
        </SEditorRest>
      ) : (
        <SEditor>
          <Editor
            height="100vh"
            defaultLanguage="json"
            onChange={handleEditorChange}
            theme="my-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 14,
              wordWrap: "off",
              folding: false,
            }}
          />

          <SFloat>
            <Sp1>EnvfyProtocolState</Sp1>
            <div style={{ flex: 1 }} />
            <Simg src="delete.svg" alt="" />
            <Simg onClick={handleFullScreen} src="fullscreen.svg" alt="" />
          </SFloat>
        </SEditor>
      )}
    </>
  );
};
export default CerEditor;
