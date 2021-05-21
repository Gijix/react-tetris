import styled from "styled-components";

export const StyledNextShape = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding:50px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  height : 189px;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;

export const StyledNextgrid = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(10vh / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  width: 100%;
  max-width: 100%;
  background: #111;
`;
