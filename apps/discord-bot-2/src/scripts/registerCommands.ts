import { REST, Routes } from "discord.js";
import { CLIENT_ID, GUILD_ID, NODE_ENV, TOKEN } from "@/utils";
import * as commands from "@/commands";

//----------------------
// Register Commands
//----------------------

const rest = new REST().setToken(TOKEN);

console.log(Object.values(commands).map(command => command.toJSON()));

const ApiPath =
	NODE_ENV === "development" && GUILD_ID
		? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
		: Routes.applicationCommands(CLIENT_ID);

void (async () => {
	await rest.put(ApiPath, {
		body: Object.values(commands).map(command => {
			const json = command.toJSON();
			return JSON.parse(JSON.stringify(json, (_, value) => (typeof value === "bigint" ? value.toString() : value)));
		})
	});
	console.log("Done");
})();
