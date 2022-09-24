import React, { useContext, DispatchWithoutAction } from "react";
import styled from "styled-components";
import { modalActions, ModalContext } from "../state/modal";

const Simg = styled.img`
  transition: 250ms ease-in-out;
  user-select: none;

  :hover {
    transform: scale(1.1);
  }
`;

const AddButton = () => {
  const [{ showSchemaDetails }, dispatch] = useContext(ModalContext) as [
    ModalInitialState,
    any
  ];

  return (
    <div onClick={() => dispatch({ type: modalActions.OPEN_SCHEMA_MODAL })}>
      <Simg src="add.svg" alt="" />
    </div>
  );
};

export default AddButton;
