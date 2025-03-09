import config from "./tsup.base";
import { copy } from "esbuild-plugin-copy";
import { defineConfig } from "tsup";

export default defineConfig([
	{
		...config,
		entry: ["src/index.ts"],

		splitting: false,
		minify: true,
		shims: true,

		bundle: true,

		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,

		metafile: false,
		treeshake: true,

		outDir: "dist",

		format: ["esm"],

		esbuildPlugins: [
			copy({
				assets: [{ from: "./package.json", to: "./package.json" }]
			})
		]
	}
]);
