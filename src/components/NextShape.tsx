import { StyledNextShape, StyledNextgrid } from "./styles/StyledNextShape";
import Cell from "./Cell";
import { FC } from 'react'
import { IPlayer } from "../hooks/usePlayer";

const NextShape: FC<{ nextGrid: [number, string][][], player: IPlayer }> = ({ nextGrid, player }) => {
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
