import { FC, memo } from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton: FC<{ callback: () => void }> = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
)

export default memo(StartButton);