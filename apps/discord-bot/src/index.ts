import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "@/utils/envVariables";
import { logger } from "@/utils";
import type { SlashCommandDcBuilder } from "@/utils";
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
	intents: [GatewayIntentBits.Guilds]
});
const logg = logger.child({ context: "Setup" });

void client.login(TOKEN).catch(() => {
	logg.log("emergency", MyErrorList.WRONG_TOKEN);
	exit(1);
});

client.on("ready", () => {
	logg.info(`🎉 Logged in as ${client.user?.tag ?? "unknown user"}`);
	logg.info(`🏰 Serving ${client.guilds.cache.size.toLocaleString()} guilds`);
	logg.info(`👀 Watching ${client.channels.cache.size.toLocaleString()} channels`);
	logg.info(`👥 Ready to serve ${client.users.cache.size.toLocaleString()} users`);
});

//--------------------------------
// Command Interaction Handler
//--------------------------------

void client.on("interactionCreate", interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = (commands as unknown as Record<string, SlashCommandDcBuilder>)[commandName] as
		| SlashCommandDcBuilder
		| undefined;
	if (command) command.execute(interaction);
	logger.info(`${command?.name} executed! User: ${interaction.user.globalName} | GuildID: ${interaction.guild?.id}`, {
		context: "Command",
		details: interaction
	}); // TODO: Too heavy, change that details
});
