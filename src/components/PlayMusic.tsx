import { StyledPlayMusic } from "./styles/StyledPlayMusic";
import { FC, memo } from "react";

const PlayMusic: FC<{ inverseMusic: () => void, icon: string }> = ({ inverseMusic, icon }) => {
  return (
    <StyledPlayMusic onClick={inverseMusic}>
      <img alt={icon} src={icon}></img>
    </StyledPlayMusic>
  );
};

export default memo(PlayMusic);
