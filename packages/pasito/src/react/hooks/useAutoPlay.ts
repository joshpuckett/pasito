import { useState, useEffect, useCallback, useRef } from "react";
import { AutoPlayController } from "../../core/AutoPlayController";
import type { UseAutoPlayOptions, UseAutoPlayReturn } from "../../core/types";

export function useAutoPlay({
  count,
  active,
  onStepChange,
  stepDuration = 3000,
  loop = true,
  enabled = true,
}: UseAutoPlayOptions): UseAutoPlayReturn {
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AutoPlayController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new AutoPlayController({ stepDuration, loop });
  }
  controllerRef.current.stepDuration = stepDuration;
  controllerRef.current.loop = loop;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  // Stop playback when disabled
  useEffect(() => {
    if (!enabled) {
      setPlaying(false);
      clearTimer();
    }
  }, [enabled, clearTimer]);

  // Schedule next step when playing
  useEffect(() => {
    if (!playing || !enabled) {
      clearTimer();
      return;
    }

    timerRef.current = setTimeout(() => {
      const nextStep = controllerRef.current!.computeNext(active, count);
      if (nextStep !== null) {
        onStepChange(nextStep);
      } else {
        setPlaying(false);
      }
    }, stepDuration);

    return clearTimer;
  }, [playing, enabled, active, count, stepDuration, loop, onStepChange, clearTimer]);

  const isActive = playing && enabled;

  return {
    playing: isActive,
    toggle,
    filling: isActive,
    fillDuration: stepDuration,
  };
}
