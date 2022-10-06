import { useEffect, useState, FC } from "react";
import { useSound } from "use-sound";

import { createStage, checkCollision } from "../gameHelpers";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextShape from "./NextShape";
import PlayMusic from "./PlayMusic";

import TetrisMusic from '../sound/TetrisMusic.wav'
import sound from "../img/sound.png";
import stopSound from "../img/stopSound.png";


const Tetris: FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [music, setMusic] = useState(false);
  const [play,{stop}] = useSound(TetrisMusic,{volume : 0.1})
  const [icon,setIcon] = useState(stopSound)

  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetro] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  useEffect(() => {
    if (music) {
      setIcon(sound)
      play()
    } else {
      setIcon(stopSound)
      stop()
    }
  }, [music, play, stop]);

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const inverseMusic = () => {
    setMusic(!music)
  }

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    setMusic(true);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ code }: { code: string }) => {
    if (!gameOver) {
      if (code === "ArrowDown") {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ code }: { code: string }) => {
    switch (code) {
      case 'ArrowLeft': movePlayer(-1)
      break;
      case 'ArrowRight': movePlayer(1)
      break;
      case 'ArrowDown': dropPlayer ()
      break;
      case 'ArrowUp': playerRotate(stage, 1)
      break;
      default:
      break;
    }
  };

  useInterval(() => {
    drop();
  }, dropTime!);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyUp={keyUp}
      onKeyDown={move}
    >
      <StyledTetris>
        <PlayMusic icon={icon} inverseMusic={inverseMusic}/>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <Display text={`Score: ${score}`} />
          <StartButton callback={startGame} />
          <NextShape nextTetro={nextTetro} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
