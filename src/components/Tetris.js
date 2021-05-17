import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { createStage } from "../gameHelpers";


export default function Tetris() {
  return (
    <div className="Tetris">
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Levels" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
}
