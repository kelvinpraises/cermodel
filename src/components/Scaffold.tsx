import styled from "styled-components";
import DownloadModel from "./modals/Downloader";
import SchemaModal from "./modals/CreateSchema";
import Settings from "./modals/Setting";
import WelcomeModal from "./modals/Initialize";
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
      <WelcomeModal />
      <SchemaModal />
      <ZenMode />
      <Settings />
      <DownloadModel />
    </SScaffold>
  );
};

export default Scaffold;
