import { ref, computed, watch, unref, type Ref } from "vue";
import { AutoPlayController } from "../../core/AutoPlayController";

type MaybeRef<T> = T | Ref<T>;

export interface UseAutoPlayOptions {
  count: Ref<number>;
  active: Ref<number>;
  onStepChange: (index: number) => void;
  stepDuration?: MaybeRef<number>;
  loop?: MaybeRef<boolean>;
  enabled?: MaybeRef<boolean>;
}

export function useAutoPlay(options: UseAutoPlayOptions) {
  const playing = ref(false);
  const controller = new AutoPlayController();

  const stepDuration = computed(() => unref(options.stepDuration) ?? 3000);
  const loop = computed(() => unref(options.loop) ?? true);
  const enabled = computed(() => unref(options.enabled) ?? true);

  // Stop when disabled
  watch(enabled, (val) => {
    if (!val) playing.value = false;
  });

  // Schedule next step
  watch(
    [playing, enabled, options.active, options.count, stepDuration, loop],
    ([isPlaying, isEnabled, active, count, dur, lp], _, onCleanup) => {
      if (!isPlaying || !isEnabled) return;

      controller.stepDuration = dur;
      controller.loop = lp;

      const timer = setTimeout(() => {
        const next = controller.computeNext(active, count);
        if (next !== null) {
          options.onStepChange(next);
        } else {
          playing.value = false;
        }
      }, dur);

      onCleanup(() => clearTimeout(timer));
    },
    { immediate: true },
  );

  const isActive = computed(() => playing.value && enabled.value);

  return {
    playing: computed(() => isActive.value),
    toggle: () => {
      playing.value = !playing.value;
    },
    filling: computed(() => isActive.value),
    fillDuration: stepDuration,
  };
}
