import styled from "styled-components";
import CreateSchema from "./modals/SchemaDetails";
import Downloader from "./modals/Downloader";
import Initialize from "./modals/Initialize";
import Settings from "./modals/Settings";
import ZenMode from "./modals/ZenMode";

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
      <SContainer>{children}</SContainer>
      <Initialize />
      <CreateSchema />
      <ZenMode />
      <Settings />
      <Downloader />
    </SScaffold>
  );
};

export default Scaffold;
