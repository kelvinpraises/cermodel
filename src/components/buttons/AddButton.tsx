import React, { useContext, DispatchWithoutAction, useCallback } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../../state/modal";

const Simg = styled.img`
  transition: 250ms ease-in-out;
  user-select: none;

  :hover {
    transform: scale(1.1);
  }
`;

const AddButton = () => {
  const { modalDispatch } = useContext(ModalContext) as { modalDispatch: any };

  const handleClick = useCallback(() => {
    modalDispatch({ type: modalActions.OPEN_SCHEMA_MODAL });
  }, []);

  return (
    <div onClick={handleClick}>
      <Simg src="add.svg" alt="" />
    </div>
  );
};

export default AddButton;
