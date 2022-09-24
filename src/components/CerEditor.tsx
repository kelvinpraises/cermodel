import Editor from "@monaco-editor/react";
import { useContext } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";

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
  width: 25rem;
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
  width: 23rem;
  height: 4rem;
  border-radius: 0.75rem;
  position: fixed;
  bottom: 2rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.accent1};
  left: 3rem;
`;

const Sp1 = styled.p`
  color: ${({ theme }) => theme.text3};
  margin-right: 6.3rem;
`;

const Simg = styled.img`
  margin-left: 1.6rem;
  transition: 250ms ease-out;
  :hover {
    transform: scale(1.1);
  }
`;

const CerEditor = () => {
  function handleEditorDidMount(editor: any, monaco: any) {
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

  const { dispatch } = useContext(ModalContext) as { dispatch: any };

  const show = false;

  return (
    <>
      {show ? (
        <SEditorRest>
          <Sp>Click The Green Button To Start Editing</Sp>
        </SEditorRest>
      ) : (
        <SEditor>
          <Editor
            height="100vh"
            defaultLanguage="javascript"
            onChange={handleEditorChange}
            theme="my-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
          <SFloat>
            <Sp1>EnvfyProtocolState</Sp1>
            <Simg src="delete.svg" alt="" />
            <Simg
              onClick={() => {
                dispatch({ type: modalActions.OPEN_ZEN_MODE_MODAL });
                console.log("click");
              }}
              src="zenmode.svg"
              alt=""
            />
          </SFloat>
        </SEditor>
      )}
    </>
  );
};
export default CerEditor;
