import { useState, useCallback } from "react";

import { TETROMINOS } from "../tetrominos";
import { useTetromino } from "./useTetromino";
import { checkCollision, IGrid, STAGE_WIDTH } from "../gameHelpers";

export interface IPlayer {
  pos: { x: number, y: number}
  tetromino: (number | string)[][],
  collided: boolean
}

export const usePlayer = () => {
  const [player, setPlayer] = useState<IPlayer>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  const [getTetro, count, updateNextTetromino] = useTetromino();
  const rotate = (matrix: (number | string) [][], dir: number) => {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage: IGrid, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as IPlayer;
    let offset = 1;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided = false }: { x: number, y: number, collided?: boolean }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: getTetro.shape,
      collided: false,
    });
    updateNextTetromino(count)
  }, [getTetro, updateNextTetromino, count]);

  return [player, updatePlayerPos, resetPlayer, playerRotate, getTetro] as const;
};
