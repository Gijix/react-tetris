import { StyledNextShape, StyledNextgrid } from "./styles/StyledNextShape";
import Cell from "./Cell";
import { FC, memo } from 'react'
import { Tetro } from "../tetrominos";

const NextShape: FC<{ nextTetro: Tetro }> = ({ nextTetro }) => {
  return (
    <StyledNextShape>
      <StyledNextgrid width={nextTetro.shape.length} height={nextTetro.shape[0].length}>
        {nextTetro.shape.map((row) =>
          row.map((type, x) => <Cell key={x} type={type} />)
        )}
      </StyledNextgrid>
    </StyledNextShape>
  );
};

export default  memo(NextShape);
