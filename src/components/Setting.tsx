import { useContext } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";
import SaveChange from "./SaveChange";
import Text from "./Text";
// import { Toggle } from "react-toggle-component";

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

const SSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SCheckInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.inputField};

  :before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.accent1};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SCheckInput}:checked + & {
    background-color: ${({ theme }) => theme.accent2};
  }

  ${SCheckInput}:focus + & {
    box-shadow: ${({ theme }) => `0 0 1px ${theme.accent1}`};
  }

  ${SCheckInput}:checked + &:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: ${({ theme }) => theme.accent1};
  }
`;

const SFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 0.5rem;
`;

const Sp = styled.p`
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
`;

const Settings = () => {
  const {
    state: { showSettings },
    dispatch,
  } = useContext(ModalContext) as {
    state: ModalInitialState;
    dispatch: any;
  };

  if (!showSettings) {
    return null;
  }

  return (
    <SModal
      onClick={() => dispatch({ type: modalActions.CLOSE_SETTING_MODAL })}
    >
      <SSchema onClick={(e) => e.stopPropagation()}>
        <SHeader>
          <Text type="h5">Settings</Text>
          <SClose
            onClick={() => dispatch({ type: modalActions.CLOSE_SETTING_MODAL })}
          >
            <img src="close.svg" alt="" />
          </SClose>
        </SHeader>
        <SBody>
          <STitle>DID Seed Key</STitle>
          <SInput></SInput>
          <STitle>Ceramic Node</STitle>
          <SInput></SInput>
          <STitle>Server Endpoint</STitle>
          <SInput></SInput>
          <SFlex>
            <Sp>Auto assign border color</Sp>

            <SSwitch>
              <SCheckInput type="checkbox" />
              <SSpan></SSpan>
            </SSwitch>
          </SFlex>

          <SFlex>
            <Sp>Enable advanced view</Sp>
            <SSwitch>
              <SCheckInput type="checkbox" />
              <SSpan></SSpan>
            </SSwitch>
          </SFlex>
        </SBody>
        <SaveChange />
      </SSchema>
    </SModal>
  );
};

export default Settings;
