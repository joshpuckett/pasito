import { computed, type Ref } from "vue";
import { computeStepWindow } from "../../core/computeStepWindow";

export function useStepWindow(props: {
  count: Ref<number>;
  active: Ref<number>;
  maxVisible: Ref<number | undefined>;
  orientation: Ref<"horizontal" | "vertical">;
}) {
  return computed(() =>
    computeStepWindow(
      props.count.value,
      props.active.value,
      props.maxVisible.value,
      props.orientation.value,
    ),
  );
}
