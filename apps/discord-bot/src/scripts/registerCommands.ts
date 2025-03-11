import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import { CLIENT_ID, NODE_ENV, GUILD_ID, TOKEN } from "@/utils";
import * as commands from "@/commands";

//----------------------
// Register Commands
//----------------------

const rest = new REST().setToken(TOKEN);

const ApiPath =
	NODE_ENV === "development" && GUILD_ID
		? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
		: Routes.applicationCommands(CLIENT_ID);

void (async () => {
	await rest.put(ApiPath, {
		body: Object.values(commands).map(command => command.toJSON())
	});
	console.log("Done");
})();
