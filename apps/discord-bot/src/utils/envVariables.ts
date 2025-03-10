// eslint-disable-next-line @EslintImports/no-unassigned-import
import "dotenv/config";
import { is } from "typia";

//----------------------
// Types
//----------------------

declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			CLIENT_ID: string;
			GUILD_ID?: string;
			TOKEN: string;
		}
	}
}

//----------------------
// Functions
//----------------------

const envVariables = process.env;

// eslint-disable-next-line no-undef
if (!is<NodeJS.ProcessEnv>(envVariables)) throw new Error("Invalid env variables");

export default envVariables;
export const { TOKEN, TZ, CLIENT_ID, GUILD_ID, ...restEnv } = envVariables;
