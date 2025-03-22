import { t, init } from "i18next";
import * as langs from "@/i18n";
import { NODE_ENV } from "./envVariables";
import type { Locale } from "discord.js";

//----------------------
// Setup i18next
//----------------------

void init({
	lng: "en-US",
	fallbackLng: "en-US",
	debug: NODE_ENV == "development", //TODO: FIX cuz is not true at development mode
	resources: langs
});

//----------------------
// Functions
//----------------------

/**
 * Generates an object containing translations for a given key across all available languages from the `i18n` folder
 *
 * @param path - Translation key path (e.g. "commands.ping.description") (from `t`[0] - i18n)
 * @param options - Optional translation variables and options (from `t`[1] - i18n)
 *
 * @example
 * ```ts
 * const translations = translates("commands.ping.description");
 * // Returns:
 * // {
 * //   "en-US": "Check if bot is alive",
 * //   "pl-PL": "Sprawdź czy bot działa",
 * //   "es-ES": "Comprueba si el bot está vivo"
 * // }
 * ```
 * @returns Object with language codes as keys and translations as values (`Record<Locale, string>`)
 * ```ts
 * {
 *   "en-US": "Hello John!",
 *   "pl": "Cześć John!",
 *   "es-ES": "¡Hola John!"
 *		//...
 * }
 *
 */
export const translates = (path: Parameters<typeof t>[0], options: Parameters<typeof t>[2]): Record<Locale, string> => {
	const result: Record<string, string> = {};
	const availableLangs = Object.keys(langs);

	for (const lang of availableLangs) {
		result[lang] = t(path, { ...options, lng: lang });
	}

	return result;
};

export default translates;
