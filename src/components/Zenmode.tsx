import React, {
  useContext,
  DispatchWithoutAction,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";
import Editor from "@monaco-editor/react";
import toggleFullScreen from "../utils/fullscreen";

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

const SZenmode = styled.div`
  width: 30.6rem;
  height: 100vh;
  background: ${({ theme }) => theme.card};
  overflow-y: auto;
`;

const STitle = styled.div`
  width: 30.6rem;
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

const Zenmode = () => {
  const [{ showZenMode }, dispatch] = useContext(ModalContext) as [
    ModalInitialState,
    any
  ];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showZenMode) {
      toggleFullScreen(ref);
    }
  }, [showZenMode]);

  function handleEditorDidMount(editor: any, monaco: any) {
    console.log("here is the monaco instance:", monaco);
    monaco.editor.defineTheme("my-dark", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "custom-info", foreground: "a3a7a9", background: "ffffff" },
        { token: "custom-error", foreground: "ee4444" },
        { token: "custom-notice", foreground: "1055af" },
        { token: "custom-date", foreground: "20aa20" },
      ],
      colors: {
        "editor.background": "#24283B",
      },
    });

    monaco.editor.setTheme("my-dark");
  }

  function handleEditorChange(value: any, event: any) {
    console.log(`here is the current model value: ${value}`);
  }

  if (!showZenMode) {
    return null;
  }

  return (
    <SBackground ref={ref}>
      <SZenmode>
        <STitle>
          <Sp>EnvfyProtocolState</Sp>
          <Simg
            onClick={() =>
              dispatch({ type: modalActions.CLOSE_ZEN_MODE_MODAL })
            }
            src="close.svg"
            alt=""
          />
        </STitle>

        <Editor
          height="90vh"
          defaultLanguage="javascript"
          onChange={handleEditorChange}
          theme="my-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: true,
            },
            fontSize: 14,
            wordWrap: "on",
          }}
        />
      </SZenmode>
    </SBackground>
  );
};

export default Zenmode;
