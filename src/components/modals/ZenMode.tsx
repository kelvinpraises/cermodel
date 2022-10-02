import Editor from "@monaco-editor/react";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import theme from "../../../public/monaco-theme.json";
import { modalActions, ModalContext } from "../../state/modal";
import { schemaActions, SchemaContext } from "../../state/schema";
import toggleFullScreen from "../../utils/fullscreen";

const SBackground = styled.div`
  background: ${({ theme }) => theme.background};
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SZenMode = styled.div`
  width: 45vw;
  height: 100vh;
  background: ${({ theme }) => theme.card};
  overflow-y: auto;
`;

const STitle = styled.div`
  width: 45vw;
  height: 4rem;
  background: ${({ theme }) => theme.accent1};
  display: flex;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
`;

const Sp = styled.p`
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
`;

const Simg = styled.img`
  transition: 100ms;
  :hover {
    transform: scale(1.05);
  }
`;

const ZenMode = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { modalState, modalDispatch } = useContext(ModalContext) as {
    modalState: ModalState;
    modalDispatch: any;
  };

  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  useEffect(() => {
    if (modalState.showZenMode) {
      toggleFullScreen(ref);
    }
  }, [modalState.showZenMode]);

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

  const handleClose = useCallback(() => {
    toggleFullScreen(ref);
    modalDispatch({ type: modalActions.CLOSE_ZEN_MODE_MODAL });
  }, [ref]);

  const getCurrentDraft = useMemo(() => {
    const index = schemaState.schemas.findIndex(
      (e) => e.id === schemaState.activeId
    );
    const current = schemaState.schemas[index]?.schema;
    return current;
  }, [schemaState]);

  if (!modalState.showZenMode) {
    return null;
  }

  return (
    <SBackground ref={ref}>
      <SZenMode>
        <STitle>
          <Sp>EnvfyProtocolState</Sp>
          <Simg onClick={handleClose} src="close.svg" alt="" />
        </STitle>

        <Editor
          height="90vh"
          defaultValue={getCurrentDraft}
          defaultLanguage="json"
          theme="my-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 14,
            wordWrap: "off",
          }}
        />
      </SZenMode>
    </SBackground>
  );
};

export default ZenMode;
