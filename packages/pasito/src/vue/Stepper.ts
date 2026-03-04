import { defineComponent, type PropType, toRef, computed, h } from "vue";
import { useStepWindow } from "./composables/useStepWindow";
import { useAnimatingSteps } from "./composables/useAnimatingSteps";
import { Step } from "./Step";

export const Stepper = defineComponent({
  name: "Stepper",
  props: {
    count: { type: Number, required: true },
    active: { type: Number, required: true },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    maxVisible: { type: Number, default: undefined },
    transitionDuration: { type: Number, default: 500 },
    easing: { type: String, default: undefined },
    filling: { type: Boolean, default: false },
    fillDuration: { type: Number, default: undefined },
  },
  emits: ["step-click"],
  setup(props, { emit }) {
    const stepWindow = useStepWindow({
      count: toRef(props, "count"),
      active: toRef(props, "active"),
      maxVisible: toRef(props, "maxVisible"),
      orientation: toRef(props, "orientation"),
    });

    const steps = useAnimatingSteps(
      toRef(props, "count"),
      toRef(props, "transitionDuration"),
    );

    const containerClass = computed(() =>
      [
        "pasito-container",
        props.orientation === "vertical" && "pasito-vertical",
      ]
        .filter(Boolean)
        .join(" "),
    );

    return () => {
      const { containerSize, transformValue } = stepWindow.value;
      const sizeStyle: Record<string, string> = {};

      if (containerSize != null) {
        if (props.orientation === "vertical") {
          sizeStyle.height = `${containerSize}px`;
        } else {
          sizeStyle.width = `${containerSize}px`;
        }
      }

      return h(
        "div",
        {
          class: containerClass.value,
          role: "tablist",
          "aria-label": "Progress steps",
          style: {
            "--pill-duration": `${props.transitionDuration}ms`,
            ...(props.easing && { "--pill-easing": props.easing }),
            ...sizeStyle,
          },
        },
        [
          h(
            "div",
            {
              class: "pasito-track",
              style: { transform: transformValue },
            },
            steps.value.map((step) =>
              h(Step, {
                key: step.key,
                index: step.index,
                isActive: step.index === props.active,
                phase: step.phase,
                transitionDuration: props.transitionDuration,
                filling: step.index === props.active && props.filling,
                fillDuration: props.fillDuration,
                onClick: () => emit("step-click", step.index),
              }),
            ),
          ),
        ],
      );
    };
  },
});
