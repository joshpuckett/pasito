import { useMemo } from "react";
import { computeStepWindow } from "../../core/computeStepWindow";

export function useStepWindow(
  count: number,
  active: number,
  maxVisible: number | undefined,
  orientation: "horizontal" | "vertical",
) {
  return useMemo(
    () => computeStepWindow(count, active, maxVisible, orientation),
    [count, active, maxVisible, orientation],
  );
}
