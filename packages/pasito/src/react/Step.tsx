import type { StepProps } from "../core/types";

export function Step({
  index,
  isActive,
  phase,
  transitionDuration,
  filling,
  fillDuration,
  onClick,
}: StepProps): React.ReactElement {
  const classNames = [
    "pasito-step",
    isActive && "pasito-step-active",
    isActive && filling && "pasito-step-filling",
    phase === "entering" && "pasito-entering",
    phase === "exiting" && "pasito-exiting",
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {
    "--pill-duration": `${transitionDuration}ms`,
  } as React.CSSProperties;

  if (isActive && filling && fillDuration) {
    (style as Record<string, string>)["--pill-fill-duration"] = `${fillDuration}ms`;
  }

  return (
    <button
      className={classNames}
      style={style}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-label={`Step ${index + 1}`}
      tabIndex={isActive ? 0 : -1}
    />
  );
}
