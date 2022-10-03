import { FC } from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

const Display: FC<{ gameOver?: boolean, text: string}> = ({ gameOver = false, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;