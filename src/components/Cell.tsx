import { FC, memo } from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS, tetrokey } from '../tetrominos';

const Cell: FC<{ type: string | number }> = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type as tetrokey].color} />
)

export default memo(Cell);