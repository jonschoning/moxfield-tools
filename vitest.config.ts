import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {},
  test: {
    globals: true,
    setupFiles: ["./test/vitest.setup.ts"],
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
