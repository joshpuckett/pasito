import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { StepAnimator } from "../../core/StepAnimator";
import type { AnimatingStep } from "../../core/types";

export function useAnimatingSteps(
  count: number,
  _duration: number,
): AnimatingStep[] {
  const animatorRef = useRef<StepAnimator | null>(null);
  if (animatorRef.current === null) {
    animatorRef.current = new StepAnimator(count);
  }
  const animator = animatorRef.current;

  const [steps, setSteps] = useState<AnimatingStep[]>(() => animator.getSteps());

  // Reconcile when count changes — runs before paint so no flash
  useLayoutEffect(() => {
    animator.reconcile(count);
    setSteps(animator.getSteps());
  }, [count, animator]);

  // Promote entering → stable after browser paints the width:0 state
  const hasEntering = steps.some((s) => s.phase === "entering");
  useEffect(() => {
    if (!hasEntering) return;
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        animator.promoteEntering();
        setSteps(animator.getSteps());
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [hasEntering, animator]);

  // Remove exiting steps from DOM after their transitions finish
  const exitingCount = steps.filter((s) => s.phase === "exiting").length;
  useEffect(() => {
    if (exitingCount === 0) return;
    const timer = setTimeout(() => {
      animator.removeExiting();
      setSteps(animator.getSteps());
    }, 300);
    return () => clearTimeout(timer);
  }, [exitingCount, animator]);

  return steps;
}
