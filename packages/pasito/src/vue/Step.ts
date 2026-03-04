import { defineComponent, type PropType, h } from "vue";

export const Step = defineComponent({
  name: "Step",
  props: {
    index: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    phase: {
      type: String as PropType<"entering" | "stable" | "exiting">,
      required: true,
    },
    transitionDuration: { type: Number, required: true },
    filling: { type: Boolean, default: false },
    fillDuration: { type: Number, default: undefined },
  },
  emits: ["click"],
  setup(props, { emit }) {
    return () => {
      const classNames = [
        "pasito-step",
        props.isActive && "pasito-step-active",
        props.isActive && props.filling && "pasito-step-filling",
        props.phase === "entering" && "pasito-entering",
        props.phase === "exiting" && "pasito-exiting",
      ]
        .filter(Boolean)
        .join(" ");

      const style: Record<string, string> = {
        "--pill-duration": `${props.transitionDuration}ms`,
      };

      if (props.isActive && props.filling && props.fillDuration) {
        style["--pill-fill-duration"] = `${props.fillDuration}ms`;
      }

      return h("button", {
        class: classNames,
        style,
        onClick: () => emit("click"),
        role: "tab",
        "aria-selected": props.isActive,
        "aria-label": `Step ${props.index + 1}`,
        tabindex: props.isActive ? 0 : -1,
      });
    };
  },
});
