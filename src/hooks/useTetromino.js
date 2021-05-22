import { TETROMINOS } from "../tetrominos";
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
  const shuffle = (array) => {
    let tab = array.slice();
    for (let i = 0; i < array.length; i++) {
      array[i] = tab.splice(Math.floor(Math.random() * tab.length), 1)[0];
    }
    return array;
  };
  const getTetromino = useCallback ((count) => {
    
    if (count <= 6) {
     
      setCount(count + 1 );
      return TETROMINOS[tetromino[count]];
     
    } else {
      setTetromino(shuffle(tetromino));
      setCount(1);
      return TETROMINOS[tetromino[0]];
    }
  },[tetromino]);
  return [getTetromino, count];
};
