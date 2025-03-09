import { Client } from "discord.js";
import { TOKEN } from "@/utils/envVariables";

const client = new Client({ intents: [] });

client
	.login(TOKEN)
	.then(() => {
		console.log("Logged in");
	})
	.catch((error: unknown) => {
		console.error(error);
	});
