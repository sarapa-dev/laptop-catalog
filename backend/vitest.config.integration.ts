import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    include: ["**/*.int.test.ts"],
    setupFiles: ["./tests/setup-integration.ts"],
  },
});
