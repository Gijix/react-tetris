import Cell from "../components/Cell";

const Stage = ( {stage} ) => {
console.log(stage)
  return (
    <div className="Stage">
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
}
export default Stage