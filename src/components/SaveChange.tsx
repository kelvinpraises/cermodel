import React from "react";
import styled from "styled-components";
import Text from "./Text";

const SBox = styled.div`
  width: 23rem;
  height: 4rem;
  background: ${({ theme }) => theme.accent1};
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  border-radius: 5px;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SSave = styled.div`
  width: 4.8rem;
  height: 1.85rem;
  display: grid;
  place-items: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.accent2};
  cursor: pointer;
`;

const SDiscard = styled.div`
  width: 4rem;
  height: 1.85rem;
  margin-right: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  :hover {
    text-decoration: underline white 1px;
  }
`;

const Sp = styled.p`
  font-size: 14px;
`;
const SBox1 = styled.div`
  display: flex;
  user-select: none;
`;

const SaveChange = () => {
  return (
    <SBox>
      <Text>Save changes?</Text>
      <SBox1>
        <SDiscard>
          <Sp>Reset</Sp>
        </SDiscard>
        <SSave>
          <Sp>Save</Sp>
        </SSave>
      </SBox1>
    </SBox>
  );
};

export default SaveChange;
