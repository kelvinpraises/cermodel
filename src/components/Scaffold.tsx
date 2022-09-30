import styled from "styled-components";
import DownloadModel from "./DownloadModel";
import SchemaModal from "./SchemaModal";
import Settings from "./Setting";
import WelcomeModal from "./WelcomeModal";
import ZenMode from "./ZenMode";

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
