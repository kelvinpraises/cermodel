import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import styled from "styled-components";
import AuthModal from "./Modal";
import AddContactModal from "./AddContactModal";

interface IScaffoldProp {
  children: React.ReactNode;
}

const SScaffold = styled.div`
  display: flex;
`;

const SContainer = styled.div`
  width: 100%;
`;

const Scaffold: React.FC<IScaffoldProp> = ({ children }) => {
  return (
    <SScaffold>
      <Navigation />
      <SContainer>{children}</SContainer>
      <AuthModal />
      <AddContactModal />
    </SScaffold>
  );
};

export default Scaffold;
