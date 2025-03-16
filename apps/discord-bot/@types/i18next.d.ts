import "i18next";
import * as langs from "@/i18n";

declare module "i18next" {
	interface CustomTypeOptions {
		resources: (typeof langs)[keyof typeof langs];
	}
}
