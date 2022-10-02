import Editor from "@monaco-editor/react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import theme from "../../public/monaco-theme.json";
import { modalActions, ModalContext } from "../state/modal";
import { schemaActions, SchemaContext } from "../state/schema";
import UpdateSchema from "./modals/UpdateSchema";

interface IRenderEditor {
  disposeEditor: boolean;
  getCurrentDraft: string;
  handleEditorChange: (value: any, event: any) => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
}

const SEditorRest = styled.div`
  width: 29rem;
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
  line-height: 2rem;
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

const STitle = styled.p`
  color: ${({ theme }) => theme.text3};
  cursor: pointer;
`;

const Simg = styled.img`
  margin-left: 1.6rem;
  transition: 250ms ease-out;
  :hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;

const CerEditor = () => {
  const [showEditor, setShowEditor] = useState(false);

  const [disposeEditor, setDisposeEditor] = useState(false);

  const { modalState, modalDispatch } = useContext(ModalContext) as {
    modalState: ModalState;
    modalDispatch: any;
  };

  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  // Shows the editor if there's an active schema id.
  useEffect(() => {
    schemaState.activeId === "" ? setShowEditor(false) : setShowEditor(true);
  }, [schemaState]);

  // Disposes editor and rerenders so it always shows the active id's schema draft
  useEffect(() => {
    setDisposeEditor(() => {
      setTimeout(() => {
        setDisposeEditor(false);
      }, 1);
      return true;
    });
  }, [modalState.showZenMode, schemaState.activeId]);

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    monaco.editor.defineTheme("my-dark", JSON.parse(JSON.stringify(theme)));
    monaco.editor.setTheme("my-dark");
  }, []);

  const handleEditorChange = useCallback(
    (value: any, event: any) => {
      schemaDispatch({
        type: schemaActions.UPDATE_DRAFT,
        payload: {
          id: schemaState.activeId,
          schemaDraft: value,
        },
      });
    },
    [schemaState, schemaActions]
  );

  const getCurrentSchema = useMemo(() => {
    const index = schemaState.schemas.findIndex(
      (e) => e.id === schemaState.activeId
    );
    const current = schemaState.schemas[index];
    return current;
  }, [schemaState]);

  const getCurrentDraft = useMemo(() => {
    const index = schemaState.schemas.findIndex(
      (e) => e.id === schemaState.activeId
    );
    const current = schemaState.schemas[index]?.schema;
    return current;
  }, [schemaState]);

  const handleUpdateSchema = useCallback(() => {
    modalDispatch({ type: modalActions.OPEN_UPDATE_DRAFT_MODAL });
  }, []);

  const handleDeleteSchema = useCallback(() => {
    schemaDispatch({
      type: schemaActions.DELETE_SCHEMA,
      payload: {
        id: schemaState.activeId,
      },
    });
  }, [schemaState]);

  const handleFullScreen = useCallback(() => {
    modalDispatch({ type: modalActions.OPEN_ZEN_MODE_MODAL });
  }, []);

  return (
    <>
      {!showEditor ? (
        <SEditorRest>
          {schemaState.schemas.length === 0 ? (
            <Sp>Click The Green Button To Create A New Project</Sp>
          ) : (
            <Sp>
              Choose An Existing Project Card In The Stack Or Add A New One
            </Sp>
          )}
        </SEditorRest>
      ) : (
        <SEditor>
          <UpdateSchema initialState={getCurrentSchema} />

          <RenderEditor
            disposeEditor={disposeEditor}
            getCurrentDraft={getCurrentDraft}
            handleEditorChange={handleEditorChange}
            handleEditorDidMount={handleEditorDidMount}
          />

          <SFloat>
            <STitle onClick={handleUpdateSchema}>
              {getCurrentSchema?.schemaDetails?.schemaAlias}
            </STitle>
            <div style={{ flex: 1 }} />
            <Simg onClick={handleDeleteSchema} src="delete.svg" alt="" />
            <Simg onClick={handleFullScreen} src="fullscreen.svg" alt="" />
          </SFloat>
        </SEditor>
      )}
    </>
  );
};

const RenderEditor: React.FC<IRenderEditor> = ({
  disposeEditor,
  getCurrentDraft,
  handleEditorChange,
  handleEditorDidMount,
}) => {
  if (disposeEditor) return null;

  return (
    <Editor
      height="100%"
      defaultValue={getCurrentDraft}
      defaultLanguage="json"
      onChange={handleEditorChange}
      theme="my-dark"
      keepCurrentModel={false}
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
  );
};

export default CerEditor;
