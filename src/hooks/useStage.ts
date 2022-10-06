import { useState, useEffect, useCallback } from "react";
import { createStage } from "../gameHelpers";
import type { IPlayer } from "./usePlayer";

export const useStage = (player: IPlayer, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  const sweepRows = (newStage: [number, string][][]) =>
      newStage.reduce<[number, string][][]>((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0,"clear"]))
          return ack
        }
        ack.push(row);
        return ack;
      },[]);

  const updateStage = useCallback((prevStage: [number, string][][]) => {
        const newStage: [number, string][][]  = prevStage.map((row) =>
          row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
        );
  
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
  
        if (player.collided) {
          resetPlayer();
          return sweepRows(newStage)
        }
  
        return newStage;
      }, [player, resetPlayer]);

  useEffect(() => {
    setRowsCleared(0);
    setStage((prev) => updateStage(prev));
  }, [updateStage]);

  return [stage, setStage,rowsCleared] as const;
};
