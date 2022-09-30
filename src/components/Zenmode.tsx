import Editor from "@monaco-editor/react";
import { useCallback, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";
import toggleFullScreen from "../utils/fullscreen";
import theme from "../../public/monaco-theme.json";

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
  const { modalState, modalDispatch } = useContext(ModalContext) as {
    modalState: ModalState;
    modalDispatch: any;
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalState.showZenMode) {
      toggleFullScreen(ref);
    }
  }, [modalState.showZenMode]);

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    monaco.editor.defineTheme("my-dark", JSON.parse(JSON.stringify(theme)));
    monaco.editor.setTheme("my-dark");
  }, []);

  const handleClose = useCallback(() => {
    toggleFullScreen(ref);
    modalDispatch({ type: modalActions.CLOSE_ZEN_MODE_MODAL });
  }, [ref]);

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
          defaultLanguage="json"
          theme="my-dark"
          onMount={handleEditorDidMount}
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
