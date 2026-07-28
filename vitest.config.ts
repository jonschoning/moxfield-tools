import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reportOnFailure: true,
      reporter: [
        ["cobertura"],
        ["json"],
        ["html", { subdir: "html" }],
        ["text-summary"],
      ],
      reportsDirectory: "./coverage",
    },
  },
});
