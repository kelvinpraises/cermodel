import { useContext } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";

const SBox = styled.div`
  width: 4.1rem;
  height: 19.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SImg = styled.div`
  margin-top: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: #262b3d;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: 250ms ease-in-out;
  user-select: none;
  :hover {
    background-color: #ffffff;
  }
`;
const SDownload = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  user-select: none;
  background-color: #ffffff;
  display: grid;
  place-items: center;
  margin-bottom: 5.5rem;
  transition: 250ms ease-in-out;
  :hover {
    background-color: #81cc2a;
  }
`;

const Operations = () => {
  const { dispatch } = useContext(ModalContext) as { dispatch: any };

  return (
    <SBox>
      <SDownload
        onClick={() => dispatch({ type: modalActions.OPEN_DOWNLOAD_MODAL })}
      >
        <img src="Download.svg" alt="" />
      </SDownload>
      <SImg onClick={() => dispatch({ type: modalActions.OPEN_SETTING_MODAL })}>
        <img src="Setting.svg" alt="" />
      </SImg>
      <SImg onClick={() => dispatch({ type: modalActions.OPEN_WELCOME_MODAL })}>
        <img src="Info.svg" alt="" />
      </SImg>
    </SBox>
  );
};

export default Operations;
