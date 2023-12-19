import { FC, memo } from 'react';
import { StyledPlayMusic } from './styles/StyledPlayMusic';

const Toggle: FC<{ toggleGame: () => void, dropTime: number | null }> = ({ toggleGame, dropTime }) => (
  <StyledPlayMusic onClick={toggleGame}>
    <p>flemme de trouver une image de button</p>
    <p>{dropTime ? "là c'est pas pausé": "là c'est pausé"}</p>
  </StyledPlayMusic>
)

export default memo(Toggle);