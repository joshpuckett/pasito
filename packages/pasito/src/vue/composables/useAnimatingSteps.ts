import { ref, watch, computed, type Ref } from "vue";
import { StepAnimator } from "../../core/StepAnimator";
import type { AnimatingStep } from "../../core/types";

export function useAnimatingSteps(count: Ref<number>, _duration: Ref<number>) {
  const animator = new StepAnimator(count.value);
  const steps = ref<AnimatingStep[]>(animator.getSteps()) as Ref<AnimatingStep[]>;

  // Reconcile on count change
  watch(count, (newCount) => {
    animator.reconcile(newCount);
    steps.value = animator.getSteps();
  });

  // Promote entering → stable after browser paints the width:0 state
  const hasEntering = computed(() => steps.value.some((s) => s.phase === "entering"));
  watch(hasEntering, (val, _, onCleanup) => {
    if (!val) return;
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        animator.promoteEntering();
        steps.value = animator.getSteps();
      });
    });
    onCleanup(() => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    });
  });

  // Remove exiting steps from DOM after their transitions finish
  const exitingCount = computed(() =>
    steps.value.filter((s) => s.phase === "exiting").length,
  );
  watch(exitingCount, (val, _, onCleanup) => {
    if (val === 0) return;
    const timer = setTimeout(() => {
      animator.removeExiting();
      steps.value = animator.getSteps();
    }, 300);
    onCleanup(() => clearTimeout(timer));
  });

  return steps;
}
