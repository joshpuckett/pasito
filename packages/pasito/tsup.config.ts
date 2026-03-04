import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/react/index.ts",
    react: "src/react/index.ts",
    vue: "src/vue/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "vue"],
  banner: { js: '"use client";' },
});
