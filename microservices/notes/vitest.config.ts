/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 30000,
  },
  logLevel: "info",
  esbuild: {
    sourcemap: "both",
  },
  resolve: {
    alias: {
      "@notes/core": "./services/core",
    },
  },
});
