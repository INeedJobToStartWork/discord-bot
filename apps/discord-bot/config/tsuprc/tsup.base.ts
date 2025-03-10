import { defineConfig } from "tsup";
import typiaPlug from "@ryoppippi/unplugin-typia/esbuild";

export default defineConfig({
	entry: ["src/index.ts", "src/scripts/registerCommands.ts"],
	target: "esnext",
	clean: false,
	format: ["esm"],
	noExternal: ["discord-api-types", "oh-my-error"],
	esbuildPlugins: [
		typiaPlug({ tsconfig: "./tsconfig.json", cache: false })
		// copy({
		// 	assets: [{ from: "./package.json", to: "./package.json" }]
		// })
	]
	// 	banner: ({ format }) => {
	// 		if (format === "esm") {
	// 			const banner = `
	// import { createRequire } from "node:module";
	// const require = createRequire(import.meta.url);
	//       `;

	// 			return { js: banner };
	// 		}
	// 	}
});
