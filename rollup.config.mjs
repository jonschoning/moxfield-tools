import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import externals from "rollup-plugin-node-externals";

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      del({ targets: "dist/*", runOnce: true }),
      externals(),
      nodeResolve(),
      commonjs(),
      esbuild(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [
      externals(),
      nodeResolve(),
      dts({ compilerOptions: { composite: false } }),
    ],
  },
];
