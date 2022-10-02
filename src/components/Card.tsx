import Editor from "@monaco-editor/react";
import React, { useCallback } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { schemaActions } from "../state/schema";

interface ICardProps {
  index: number;
  schema: Schema;
  schemaDispatch: (x: SchemaAction) => any;
  stackControls: {
    setNeighborIndex: (index: number) => void;
    resetNeighborIndex: (index: number) => void;
    showCard2: boolean;
    hoverCard2: boolean;
    setHover: (index: number) => void;
    resetHover: (index: number) => void;
    showCard4: boolean;
    hoverCard4: boolean;
  };
}

interface IGetCardComp {
  className?: any;
  style?: any;
  onMouseOut?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
}

interface IIndicatorProps {
  color: string;
  schema: Schema;
  schemaDispatch: (x: SchemaAction) => any;
}

interface ICardStyleProps {
  color: any;
}

const SCard = styled.div<ICardStyleProps>`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 23rem;
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
    margin-left: -21rem;
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

const SelectedIndicator = styled.div<{ color: string }>`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  z-index: 5;
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
  z-index: 3;
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

const Color = styled.div<{ color: string }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin: 0 0.5rem 0.5rem;

  :hover {
    transform: scale(1.05);
  }
`;

const Card: React.FC<ICardProps> = ({
  index,
  schema,
  schemaDispatch,
  stackControls,
}) => {
  const {
    setNeighborIndex,
    resetNeighborIndex,
    showCard2,
    hoverCard2,
    setHover,
    resetHover,
    showCard4,
    hoverCard4,
  } = stackControls;

  const handleDeleteSchema = useCallback(() => {
    schemaDispatch({
      type: schemaActions.DELETE_SCHEMA,
      payload: {
        id: schema.id,
      },
    });
  }, [schema]);

  const handleEditSchema = useCallback(() => {
    schemaDispatch({
      type: schemaActions.REPLACE_SCHEMA,
      payload: { schema },
    });
  }, [schema]);

  const getCardComp = useCallback(
    ({ onMouseOver, onMouseOut, style }: IGetCardComp) => {
      return (
        <SCard
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          color={schema.borderColor}
          style={style}
          onClick={handleEditSchema}
        >
          <SHeader onClick={(e) => e.stopPropagation()}>
            <STitle>{schema.schemaDetails?.schemaAlias}</STitle>
            <Indicator
              schema={schema}
              schemaDispatch={schemaDispatch}
              color={schema.borderColor}
            />
          </SHeader>
          <RenderEditor disposeEditor={false} getCurrentDraft={schema.schema} />
          <div onClick={(e) => e.stopPropagation()}>
            <Simg onClick={handleDeleteSchema} src="delete.svg" alt="" />
          </div>
        </SCard>
      );
    },
    [schema, schemaDispatch]
  );

  let component: React.ReactNode;

  // Maximum of five cards in stack.
  switch (index) {
    case 0:
      component = getCardComp({
        onMouseOver: () => setNeighborIndex(1),
        onMouseOut: () => resetNeighborIndex(1),
      });
      break;

    case 1:
      component = getCardComp({
        style: { zIndex: showCard2 ? 4 : hoverCard2 ? 6 : 2 },
        onMouseOver: () => setHover(2),
        onMouseOut: () => resetHover(2),
      });
      break;

    case 2:
      component = getCardComp({});
      break;

    case 3:
      component = getCardComp({
        style: { zIndex: showCard4 ? 5 : hoverCard4 ? 6 : 2 },
        onMouseOver: () => setHover(4),
        onMouseOut: () => resetHover(4),
      });
      break;

    case 4:
      component = getCardComp({
        onMouseOver: () => setNeighborIndex(5),
        onMouseOut: () => resetNeighborIndex(5),
      });
      break;

    default:
      component = <></>;
      break;
  }

  return component;
};

const Indicator: React.FC<IIndicatorProps> = ({
  schema,
  schemaDispatch,
  color,
}) => {
  const cardColor = ["#34A853", "#1DA1F2", "#9B33C3", "#1877F2", "#0A66C2"];

  const handleBorderChange = useCallback(
    (borderColor: string) => {
      schemaDispatch({
        type: schemaActions.UPDATE_BORDER_COLOR,
        payload: {
          id: schema.id,
          borderColor: borderColor,
        },
      });
    },
    [schema]
  );

  return (
    <ColorIndicator>
      <SelectedIndicator color={color}></SelectedIndicator>
      <DropDownIndicator>
        <div
          style={{
            height: "1.25rem",
            margin: "0.5rem",
            marginBottom: "1rem",
            position: "relative",
            zIndex: 5,
          }}
        ></div>
        {cardColor.map((borderColor) => (
          <Color
            key={borderColor}
            color={borderColor}
            onClick={() => handleBorderChange(borderColor)}
          />
        ))}
      </DropDownIndicator>
    </ColorIndicator>
  );
};

interface IRenderEditor {
  disposeEditor: boolean;
  getCurrentDraft: string;
}
const RenderEditor: React.FC<IRenderEditor> = ({
  disposeEditor,
  getCurrentDraft,
}) => {
  if (disposeEditor) return null;

  return (
    <Editor
      height="90%"
      defaultValue={getCurrentDraft}
      defaultLanguage="json"
      theme="my-dark"
      keepCurrentModel={false}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        wordWrap: "off",
        folding: false,
        lineNumbers: false,
        scrollBeyondLastLine: false,
        renderLineHighlight: "line",
        readOnly: true,
      }}
    />
  );
};

export default Card;
