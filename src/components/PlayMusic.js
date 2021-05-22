import { StyledPlayMusic } from "./styles/StyledPlayMusic";
import React from "react";

const PlayMusic = ({ inverseMusic,icon }) => {

  return (
    <StyledPlayMusic onClick={inverseMusic}>
      <img alt={icon} src={icon}></img>
    </StyledPlayMusic>
  );
};

export default PlayMusic;
