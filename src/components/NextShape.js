import { StyledNextShape, StyledNextgrid } from "./styles/StyledNextShape";
import Cell from "./Cell";
import React from 'react'

const NextShape = ({ nextGrid }) => {
  return (
    <StyledNextShape>
      <StyledNextgrid width={nextGrid[0].length} height={nextGrid.length}>
        {nextGrid.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </StyledNextgrid>
    </StyledNextShape>
  );
};

export default NextShape;
