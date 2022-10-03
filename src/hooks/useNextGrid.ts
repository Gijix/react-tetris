import { useState } from "react";
import { createNextGrid } from "../gameHelpers";

export const useNextgrid = () => {
  const [grid] = useState(createNextGrid());
  return [grid];
};
