import { TETROMINOS, tetrokey } from "../tetrominos";
import { useCallback, useMemo, useState } from "react";

function shuffle<T>(array: T[]) {
  let tab = array.slice();
  for (let i = 0; i < array.length; i++) {
    array[i] = tab.splice(Math.floor(Math.random() * tab.length), 1)[0];
  }
  return array;
};

export const useTetromino = () => {
  const [count, setCount] = useState(0);
  const value: tetrokey[] = ["I", "J", "L", "O", "S", "T", "Z"]
  const [tetromino, setTetromino] = useState<tetrokey[]>([...shuffle([...value])]);
  const [nextTetromino, setNextTetromino] = useState<tetrokey[]>([...shuffle([...value])])
  
  const getCurrentTetromino = useMemo (() => {
    console.log('in current')
    console.log("current",tetromino[count], count, tetromino)
    return TETROMINOS[tetromino[count]]
  }, [tetromino, count])

  const updateNextTetro = useCallback((num: number) => {
    if (num >= 6) {
      console.log("num >= 6", num)
      setTetromino([...nextTetromino]);
      setNextTetromino(shuffle(tetromino))
      setCount(0);
    } else {
      setCount(x => x + 1)
    }

  }, [setNextTetromino, nextTetromino, tetromino])

  
  return [getCurrentTetromino, count, updateNextTetro] as const;
};
