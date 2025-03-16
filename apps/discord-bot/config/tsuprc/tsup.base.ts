import { defineConfig } from "tsup";
import typiaPlug from "@ryoppippi/unplugin-typia/esbuild";

export default defineConfig({
	entry: ["src/index.ts", "src/scripts/registerCommands.ts"],
	target: "esnext",
	clean: true,
	format: ["esm"],
	noExternal: ["discord-api-types", "oh-my-error", "wilson"],
	esbuildPlugins: [typiaPlug({ tsconfig: "./tsconfig.json", cache: false })],
	banner: ({ format }) => {
		if (format === "esm") {
			const banner = `
	import { createRequire } from "node:module";
	const require = createRequire(import.meta.url);
	      `;

			return { js: banner };
		}
	}
});
