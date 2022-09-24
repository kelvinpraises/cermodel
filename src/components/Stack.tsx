import React, { useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import Card from "./Card";


const SContainer = styled.div`
  display: flex;
`;

const SEditorRest = styled.div`
  height: 80vh;
  width: 20rem;
  border: ${({ theme }) => `3px dashed ${theme.modal}`};
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Sp = styled.p`
  color: ${({ theme }) => theme.text3};
  text-align: center;
`;



const CardColor = ["#34A853", "#1DA1F2", "#9B33C3", "#1877F2", "#0A66C2"];

const test = () => {
  const [showCard2, setShowCard2] = useState(false);
  const [showCard4, setShowCard4] = useState(false);
  const [hoverCard2, setHoverCard2] = useState(false);
  const [hoverCard4, setHoverCard4] = useState(false);

  // const show = true;
  const show = false;

  const setNeighbourIndex = (index: number) => {
    if (index === 1) {
      setShowCard2(true);
    }

    if (index === 5) {
      setShowCard4(true);
    }
  };

  const resetNeighbourIndex = (index: number) => {
    if (index === 1) {
      setShowCard2(false);
    }

    if (index === 5) {
      setShowCard4(false);
    }
  };

  const setHover = (index: number) => {
    if (index === 2) {
      setHoverCard2(true);
    }

    if (index === 4) {
      setHoverCard4(true);
    }
  };

  const resetHover = (index: number) => {
    if (index === 2) {
      setHoverCard2(false);
    }

    if (index === 4) {
      setHoverCard4(false);
    }
  };

  return (
    <>
      {show ? (
        <SEditorRest>
          <Sp>Click The Green Button To Add a New Editor</Sp>
        </SEditorRest>
      ) : (
        <SContainer>
          <Card
            color={CardColor[1]}
            onMouseOver={() => setNeighbourIndex(1)}
            onMouseOut={() => resetNeighbourIndex(1)}
          ></Card>
          <Card
            color={CardColor[2]}
            style={{
              zIndex: showCard2 ? 4 : hoverCard2 ? 6 : 2,
            }}
            onMouseOver={() => setHover(2)}
            onMouseOut={() => resetHover(2)}
          ></Card>
          <Card color={CardColor[0]}></Card>
          <Card
            color={CardColor[3]}
            style={{
              zIndex: showCard4 ? 5 : hoverCard4 ? 6 : 2,
            }}
            onMouseOver={() => setHover(4)}
            onMouseOut={() => resetHover(4)}
          ></Card>
          <Card
            color={CardColor[4]}
            onMouseOver={() => setNeighbourIndex(5)}
            onMouseOut={() => resetNeighbourIndex(5)}
          ></Card>
        </SContainer>
      )}
    </>
  );
};

export default test;

