import { Client } from "discord.js";
import { TOKEN } from "@/utils/envVariables";

import type { SlashCommandDcBuilder } from "./utils";
import type { IMyErrorAPI, TMyErrorList } from "oh-my-error";
import { exit } from "node:process";
import * as commands from "@/commands";

//--------------------------------
// MyError
//--------------------------------

/* @internal */
const MyErrorList = {
	WRONG_TOKEN: {
		code: "WRONG_TOKEN",
		name: "Wrong Token",
		message: "The token is invalid",
		hint: "Please check the token at `.env` and try again"
	}
} as const satisfies TMyErrorList<IMyErrorAPI>;

//--------------------------------
// App Setup
//--------------------------------
export const client = new Client({
	intents: []
	// partials: [
	// 	Partials.Channel, // for text channel
	// 	Partials.GuildMember, // for guild member
	// 	Partials.User // for discord user
	// ],
	// intents: [
	// 	GatewayIntentBits.Guilds, // for guild related things
	// 	GatewayIntentBits.GuildMembers, // for guild members related things
	// 	GatewayIntentBits.GuildIntegrations, // for discord Integrations
	// 	GatewayIntentBits.GuildVoiceStates // for voice related things
	// ]
});

void client.login(TOKEN).catch(() => {
	console.error(MyErrorList.WRONG_TOKEN);
	exit(1);
});

client.on("ready", () => {
	console.log("Ready!");
});

//--------------------------------
// Command Interaction Handler
//--------------------------------

void client.on("interactionCreate", interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = (commands as Record<string, SlashCommandDcBuilder>)[commandName] as SlashCommandDcBuilder | undefined;
	if (command) command.execute(interaction);
});
