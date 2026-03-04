# Pasito

A tiny, themeable, dependency-free fluid stepper component.

## Install

```bash
npm i pasito
```

## React

### Quick Start

```tsx
import { Stepper } from "pasito";        // or "pasito/react"
import "pasito/styles.css";

function App() {
  const [active, setActive] = useState(0);

  return (
    <Stepper
      count={5}
      active={active}
      onStepClick={setActive}
    />
  );
}
```

### Autoplay

```tsx
import { Stepper, useAutoPlay } from "pasito";

function App() {
  const [active, setActive] = useState(0);
  const { playing, toggle, filling, fillDuration } = useAutoPlay({
    count: 5,
    active,
    onStepChange: setActive,
    stepDuration: 3000,
    loop: true,
  });

  return (
    <>
      <Stepper
        count={5}
        active={active}
        filling={filling}
        fillDuration={fillDuration}
      />
      <button onClick={toggle}>
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
}
```

## Vue

### Quick Start

```vue
<script setup>
import { ref } from "vue";
import { Stepper } from "pasito/vue";
import "pasito/styles.css";

const active = ref(0);
</script>

<template>
  <Stepper
    :count="5"
    :active="active"
    @step-click="active = $event"
  />
</template>
```

### Autoplay

```vue
<script setup>
import { ref } from "vue";
import { Stepper, useAutoPlay } from "pasito/vue";
import "pasito/styles.css";

const active = ref(0);
const { playing, toggle, filling, fillDuration } = useAutoPlay({
  count: ref(5),
  active,
  onStepChange: (i) => { active.value = i; },
  stepDuration: 3000,
  loop: true,
});
</script>

<template>
  <Stepper
    :count="5"
    :active="active"
    :filling="filling"
    :fill-duration="fillDuration"
  />
  <button @click="toggle">
    {{ playing ? "Pause" : "Play" }}
  </button>
</template>
```

## Imports

```ts
// React — default export stays React for backwards compat
import { Stepper, useAutoPlay } from "pasito";
import { Stepper, useAutoPlay } from "pasito/react";

// Vue
import { Stepper, useAutoPlay } from "pasito/vue";

// CSS (both frameworks)
import "pasito/styles.css";
```

## API

### `<Stepper />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Total number of steps |
| `active` | `number` | — | Zero-based active step index |
| `onStepClick` (React) / `@step-click` (Vue) | `(i: number) => void` | — | Called when a step is clicked |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `maxVisible` | `number` | — | Visible steps before windowing kicks in |
| `transitionDuration` | `number` | `500` | Transition duration in ms |
| `easing` | `string` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | CSS transition timing function |
| `filling` | `boolean` | `false` | Show fill progress on the active step |
| `fillDuration` | `number` | `3000` | Duration of the fill animation in ms |
| `className` (React) / `class` (Vue) | `string` | — | Additional class for CSS variable overrides |

### `useAutoPlay(options)`

**React** — pass plain values:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `count` | `number` | — | Total number of steps |
| `active` | `number` | — | Current active step |
| `onStepChange` | `(i: number) => void` | — | Called to advance the step |
| `stepDuration` | `number` | `3000` | Time per step in ms |
| `loop` | `boolean` | `true` | Loop back to first step after last |
| `enabled` | `boolean` | `true` | Enable/disable autoplay |

**Vue** — pass refs for reactive values (`count`, `active`), plain or ref for config:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `count` | `Ref<number>` | — | Total number of steps |
| `active` | `Ref<number>` | — | Current active step |
| `onStepChange` | `(i: number) => void` | — | Called to advance the step |
| `stepDuration` | `number \| Ref<number>` | `3000` | Time per step in ms |
| `loop` | `boolean \| Ref<boolean>` | `true` | Loop back to first step after last |
| `enabled` | `boolean \| Ref<boolean>` | `true` | Enable/disable autoplay |

Returns `{ playing, toggle, filling, fillDuration }` — pass `filling` and `fillDuration` directly to `<Stepper />`.

## Theming

Override any CSS custom property via a class:

```tsx
// React
<Stepper className="my-stepper" ... />
```

```vue
<!-- Vue -->
<Stepper class="my-stepper" ... />
```

| Variable | Default | Description |
|----------|---------|-------------|
| `--pill-dot-size` | `8px` | Diameter of inactive dots |
| `--pill-active-width` | `24px` | Width of the active pill (or height in vertical) |
| `--pill-gap` | `6px` | Space between steps |
| `--pill-bg` | `rgba(0,0,0,0.12)` | Inactive dot color |
| `--pill-active-bg` | `rgba(0,0,0,0.8)` | Active pill color |
| `--pill-fill-bg` | `rgba(255,255,255,0.45)` | Autoplay fill bar color |
| `--pill-container-bg` | `rgba(0,0,0,0.04)` | Container background |
| `--pill-container-border` | `rgba(0,0,0,0.06)` | Container border color |
| `--pill-container-radius` | `999px` | Container border radius |

### Dark theme example

```css
.my-stepper {
  --pill-bg: rgba(255, 255, 255, 0.15);
  --pill-active-bg: rgba(255, 255, 255, 0.9);
  --pill-fill-bg: rgba(255, 255, 255, 0.3);
  --pill-container-bg: rgba(255, 255, 255, 0.1);
  --pill-container-border: rgba(255, 255, 255, 0.12);
}
```

## Accessibility

- Steps use `role="tab"` with `aria-selected` for screen readers
- `aria-label` on each step (`Step 1`, `Step 2`, etc.)
- Keyboard focusable (active step has `tabIndex={0}`)
- `prefers-reduced-motion` is respected — all transitions resolve instantly

---

Created by [@joshpuckett](https://github.com/joshpuckett)
