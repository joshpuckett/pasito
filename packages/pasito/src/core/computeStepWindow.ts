const DOT_SIZE = 8;
const ACTIVE_WIDTH = 24;
const GAP = 6;
const SLOT_SIZE = DOT_SIZE + GAP;

export function computeStepWindow(
  count: number,
  active: number,
  maxVisible: number | undefined,
  orientation: "horizontal" | "vertical",
) {
  if (maxVisible == null || count <= maxVisible) {
    return {
      windowStart: 0,
      transformValue: "none",
      containerSize: undefined,
    };
  }

  const half = Math.floor(maxVisible / 2);
  const windowStart = Math.max(0, Math.min(active - half, count - maxVisible));

  const offset = windowStart * SLOT_SIZE;
  const axis = orientation === "vertical" ? "Y" : "X";
  const transformValue = `translate${axis}(-${offset}px)`;

  // Container size: (maxVisible - 1) regular dots + 1 active pill + gaps
  const size =
    (maxVisible - 1) * DOT_SIZE + ACTIVE_WIDTH + (maxVisible - 1) * GAP;

  return { windowStart, transformValue, containerSize: size };
}
