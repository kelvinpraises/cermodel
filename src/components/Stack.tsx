import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SchemaContext } from "../state/schema";
import Card from "./Card";

const SContainer = styled.div`
  display: flex;
`;

const SEditorRest = styled.div`
  height: 80vh;
  width: 23rem;
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
  line-height: 2rem;
`;

const test = () => {
  const { schemaState, schemaDispatch } = useContext(SchemaContext) as {
    schemaState: SchemaState;
    schemaDispatch: (x: SchemaAction) => any;
  };

  const [showCard2, setShowCard2] = useState(false);
  const [showCard4, setShowCard4] = useState(false);
  const [hoverCard2, setHoverCard2] = useState(false);
  const [hoverCard4, setHoverCard4] = useState(false);

  const [showStack, setShowStack] = useState(false);
  const [inactiveSchemas, setInactiveSchemas] = useState<Schema[]>([]);

  // Shows the stack if there's anything in the schemas that isn't the active id.
  useEffect(() => {
    const activeId = schemaState.activeId;
    const schemas = schemaState.schemas.filter((e) => e.id !== activeId);
    setInactiveSchemas(schemas);
    schemas.length > 0 ? setShowStack(true) : setShowStack(false);
  }, [schemaState]);

  const setNeighborIndex = useCallback((index: number) => {
    if (index === 1) {
      setShowCard2(true);
    }

    if (index === 5) {
      setShowCard4(true);
    }
  }, []);

  const resetNeighborIndex = useCallback((index: number) => {
    if (index === 1) {
      setShowCard2(false);
    }

    if (index === 5) {
      setShowCard4(false);
    }
  }, []);

  const setHover = useCallback((index: number) => {
    if (index === 2) {
      setHoverCard2(true);
    }

    if (index === 4) {
      setHoverCard4(true);
    }
  }, []);

  const resetHover = useCallback((index: number) => {
    if (index === 2) {
      setHoverCard2(false);
    }

    if (index === 4) {
      setHoverCard4(false);
    }
  }, []);

  const stackControls = {
    setNeighborIndex,
    resetNeighborIndex,
    showCard2,
    hoverCard2,
    setHover,
    resetHover,
    showCard4,
    hoverCard4,
  };

  if (schemaState.schemas.length === 0) return <SEditorRest />;

  return (
    <>
      {!showStack ? (
        <SEditorRest>
          <Sp>Click The Green Button To Add a New Editor</Sp>
        </SEditorRest>
      ) : (
        <SContainer>
          {inactiveSchemas.map((e, i) => (
            <Card
              key={e.id}
              index={i}
              schema={e}
              schemaDispatch={schemaDispatch}
              stackControls={stackControls}
            />
          ))}
        </SContainer>
      )}
    </>
  );
};

export default test;
