import { Client } from "discord.js";
import { TOKEN } from "@/utils/envVariables";
import * as commands from "@/commands";
import type { SlashCommandDcBuilder } from "./utils";
import type { IMyErrorAPI, TMyErrorList } from "oh-my-error";
import { exit } from "node:process";

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
const client = new Client({ intents: [] });

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
