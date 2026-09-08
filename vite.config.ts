import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: { deps: { resolveDepSubpath: true },
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    fixedExtension: false,
    dts: false,
    clean: true,
    sourcemap: true,
    minify: false,
    treeshake: true,
  },
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
  },
  staged: {
    "*.{ts,tsx,js,jsx,mjs,cjs,json,md,yml,yaml}": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
