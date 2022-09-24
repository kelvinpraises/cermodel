import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";

interface CardProps {
  color: any;
  className?: any;
  style?: any;
  children?: React.ReactNode;
  onMouseOut?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
}
interface CardStyleProps {
  color: any;
}

const SCard = styled.div<CardStyleProps>`
  display: flex;
  height: 80vh;
  width: 20rem;
  background-color: ${({ theme }) => theme.card};
  border: ${({ color }) => `3px solid ${color}`};
  border-radius: 10px;
  transition: 0.4s ease-out;
  position: relative;

  :nth-child(1) {
    z-index: 1;
  }
  :nth-child(2) {
    z-index: 2;
  }
  :nth-child(3) {
    z-index: 3;
  }
  :nth-child(4) {
    z-index: 2;
  }
  :nth-child(5) {
    z-index: 1;
  }

  :hover {
    transition: 250ms ease-out;
    transform: scale(1.01);
    z-index: 6;
  }

  :not(:first-child) {
    margin-left: -280px;
  }
`;

const STitle = styled(Text)`
  color: white;
`;

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  height: 3rem;
`;

const Simg = styled.img`
  width: 1rem;
  position: absolute;
  user-select: none;
  bottom: 0px;
  right: 0px;
  margin: 1.1rem;
  transition: 200ms ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const SelectedIndicator = styled.div<CardProps>`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  z-index: 1;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DropDownIndicator = styled.div`
  position: absolute;
  display: none;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.accent1};
  border-radius: 10px;
  top: calc(-1.25rem / 2 + -0.5rem);
  left: 50%;
  transform: translate(-50%, 0%);
`;

const ColorIndicator = styled.div`
  width: 2.25rem;
  position: relative;

  :hover {
    ${DropDownIndicator} {
      display: flex;
    }
  }
`;

const Color = styled.div<CardProps>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin: 0 0.5rem 0.5rem;

  :hover {
    transform: scale(1.05);
  }
`;

const Card: React.FC<CardProps> = ({
  children,
  color,
  onMouseOut,
  onMouseOver,
  style,
}) => {
  return (
    <SCard
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      color={color}
      style={style}
    >
      <SHeader>
        <STitle>Card 1</STitle>
        <Indicator color={color} />
      </SHeader>
      <Simg src="delete.svg" alt="" />
    </SCard>
  );
};

export default Card;

const Indicator: React.FC<CardProps> = ({ color }) => {
  const cardColor = ["#34A853", "#1DA1F2", "#9B33C3", "#1877F2", "#0A66C2"];

  return (
    <ColorIndicator>
      <SelectedIndicator color={color}></SelectedIndicator>
      <DropDownIndicator>
        <div
          style={{ height: "1.25rem", margin: "0.5rem", marginBottom: "1rem" }}
        ></div>
        <Color color={cardColor[0]}></Color>
        <Color color={cardColor[1]}></Color>
        <Color color={cardColor[2]}></Color>
        <Color color={cardColor[3]}></Color>
        <Color color={cardColor[4]}></Color>
      </DropDownIndicator>
    </ColorIndicator>
  );
};
