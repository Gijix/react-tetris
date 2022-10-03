import { TETROMINOS, Tetro } from "../tetrominos";
import { useCallback, useState } from "react";

export const useTetromino = () => {
  const [count, setCount] = useState(7);
  // const [nextTetro,setNextTetro] = useState()
  const [tetromino, setTetromino] = useState([
    "I",
    "J",
    "L",
    "O",
    "S",
    "T",
    "Z",
  ]);
  function shuffle<T>(array: T[]) {
    let tab = array.slice();
    for (let i = 0; i < array.length; i++) {
      array[i] = tab.splice(Math.floor(Math.random() * tab.length), 1)[0];
    }
    return array;
  };
  const getTetromino = useCallback (() => {
    
    if (count <= 6) {
     
      setCount(count + 1 );
      return (TETROMINOS as Record<string, any>)[tetromino[count]];
     
    } else {
      setTetromino(shuffle(tetromino));
      setCount(1);
      return (TETROMINOS as Record<string, any>)[tetromino[0]];
    }
  },[tetromino, count]);
  return [getTetromino, count] as const;
};
