export interface PillStepperProps {
  /** Total number of steps */
  count: number;
  /** Zero-based active step index */
  active: number;
  /** Optional click handler */
  onStepClick?: (index: number) => void;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Max visible steps (enables windowing) */
  maxVisible?: number;
  /** Transition duration in ms */
  transitionDuration?: number;
  /** CSS transition timing function */
  easing?: string;
  /** Additional CSS class for overrides */
  className?: string;
  /** Whether the active step is filling (autoplay mode) */
  filling?: boolean;
  /** Duration of the fill animation in ms */
  fillDuration?: number;
}

export interface PillStepProps {
  index: number;
  isActive: boolean;
  phase: "entering" | "stable" | "exiting";
  transitionDuration: number;
  filling?: boolean;
  fillDuration?: number;
  onClick?: () => void;
}

export interface AnimatingStep {
  key: number;
  index: number;
  phase: "entering" | "stable" | "exiting";
}

export interface UseAutoPlayOptions {
  count: number;
  active: number;
  onStepChange: (index: number) => void;
  stepDuration?: number;
  loop?: boolean;
  /** When false, stops playback and resets playing state */
  enabled?: boolean;
}

export interface UseAutoPlayReturn {
  playing: boolean;
  toggle: () => void;
  filling: boolean;
  fillDuration: number;
}
