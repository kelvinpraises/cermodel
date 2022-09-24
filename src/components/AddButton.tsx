import React, { useContext, DispatchWithoutAction } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modals";

const Simg = styled.img`
  transition: 250ms ease-in-out;
  user-select: none;

  :hover {
    transform: scale(1.1);
  }
`;

const AddButton = () => {
  const { dispatch } = useContext(ModalContext) as { dispatch: any };

  return (
    <div onClick={() => dispatch({ type: modalActions.OPEN_SCHEMA_MODAL })}>
      <Simg src="add.svg" alt="" />
    </div>
  );
};

export default AddButton;
