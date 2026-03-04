import type { StepperProps } from "../core/types";
import { useStepWindow } from "./hooks/useStepWindow";
import { useAnimatingSteps } from "./hooks/useAnimatingSteps";
import { Step } from "./Step";
import "../styles/Stepper.css";

export function Stepper({
  count,
  active,
  onStepClick,
  orientation = "horizontal",
  maxVisible,
  transitionDuration = 500,
  easing,
  className,
  filling,
  fillDuration,
}: StepperProps): React.ReactElement {
  const { transformValue, containerSize } = useStepWindow(
    count,
    active,
    maxVisible,
    orientation,
  );

  const animatingSteps = useAnimatingSteps(count, transitionDuration);

  const containerClass = [
    "pasito-container",
    orientation === "vertical" && "pasito-vertical",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sizeStyle: React.CSSProperties = {};
  if (containerSize != null) {
    if (orientation === "vertical") {
      sizeStyle.height = containerSize;
    } else {
      sizeStyle.width = containerSize;
    }
  }

  return (
    <div
      className={containerClass}
      role="tablist"
      aria-label="Progress steps"
      style={{
        "--pill-duration": `${transitionDuration}ms`,
        ...(easing && { "--pill-easing": easing }),
        ...sizeStyle,
      } as React.CSSProperties}
    >
      <div
        className="pasito-track"
        style={{ transform: transformValue }}
      >
        {animatingSteps.map((step) => (
          <Step
            key={step.key}
            index={step.index}
            isActive={step.index === active}
            phase={step.phase}
            transitionDuration={transitionDuration}
            filling={step.index === active && filling}
            fillDuration={fillDuration}
            onClick={onStepClick ? () => onStepClick(step.index) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
