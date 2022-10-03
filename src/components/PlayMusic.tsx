import { StyledPlayMusic } from "./styles/StyledPlayMusic";
import { FC } from "react";

const PlayMusic: FC<{ inverseMusic: () => void, icon: string}> = ({ inverseMusic, icon }) => {

  return (
    <StyledPlayMusic onClick={inverseMusic}>
      <img alt={icon} src={icon}></img>
    </StyledPlayMusic>
  );
};

export default PlayMusic;
