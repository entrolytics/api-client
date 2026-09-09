import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  fixedExtension: false,
  // Declarations come from tsc (`--emitDeclarationOnly`) so the published types stay
  // byte-identical to what the TypeScript compiler produces for this source.
  dts: false,
  clean: true,
  sourcemap: true,
  minify: false,
  treeshake: true,
});
