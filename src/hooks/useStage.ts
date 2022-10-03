import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";
import type { IPlayer } from "./usePlayer";

export const useStage = (player: IPlayer, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage: [number, string][][]) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0,"clear"]))
          return ack
        }
        ack.push(row);
        return ack;
      },[] as [number, string][][]);


    const updateStage = (prevStage: [number, string][][]) => {
      // First flush the stage
      const newStage: [number, string][][]  = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value as number,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage)
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage,rowsCleared] as const;
};