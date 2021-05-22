import React, { useEffect, useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import { useNextgrid } from "../hooks/useNextGrid";
import { useSound } from "use-sound";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextShape from "./NextShape";
import PlayMusic from "./PlayMusic";

import TetrisMusic from '../sound/TetrisMusic.wav'

import sound from "../img/sound.png";
import stopSound from "../img/stopSound.png";


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [music, setMusic] = useState(false);
  const [play,{stop}] = useSound(TetrisMusic,{volume : 0.1})
  const [icon,setIcon] = useState(stopSound)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);
  const [grid] = useNextgrid();
  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  useEffect(() => {
    if (music) {
      setIcon(sound)
      play()
    } else {
      setIcon(stopSound)
      stop()
    }
  }, [music]);

  const inverseMusic = () => {
    setMusic(!music)
  }

  const startGame = () => {
    // Reset everything
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
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ code }) => {
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

  const move = ({ code }) => {
    if (!gameOver) {
      if (code === "ArrowLeft") {
        movePlayer(-1);
      } else if (code === "ArrowRight") {
        movePlayer(1);
      } else if (code === "ArrowDown") {
        dropPlayer();
      } else if (code === "ArrowUp") {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyUp={keyUp}
      onKeyDown={(e) => move(e)}
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
          <NextShape nextGrid={grid} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
