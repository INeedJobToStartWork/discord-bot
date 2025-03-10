import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import { CLIENT_ID, TOKEN } from "@/utils";
import * as commands from "@/commands";
import { myErrorWrapper } from "oh-my-error";

//----------------------
// Register Commands
//----------------------

const rest = new REST().setToken(TOKEN);

void (async () => {
	await myErrorWrapper(rest.put, console.error)(Routes.applicationCommands(CLIENT_ID), {
		body: [Object.values(commands).map(command => command.toJSON())]
	});
	console.log("Done");
})();
