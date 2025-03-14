import type { Locale } from "discord.js";

// export type TI18nMap = Record<Locale, TI18nMap | string>;

export type TTranslations = Record<Locale, string>;

// Record<string,TTranslations | TTranslationsMapNoRefer> but not possible to do circular reference like that
export type TI18nMap = Record<
	string,
	| Record<
			string,
			| Record<
					string,
					| Record<
							string,
							| Record<string, Record<string, Record<string, TTranslations> | TTranslations> | TTranslations>
							| TTranslations
					  >
					| TTranslations
			  >
			| TTranslations
	  >
	| TTranslations
>;
