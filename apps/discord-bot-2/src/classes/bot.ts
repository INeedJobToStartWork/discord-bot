/* eslint-disable accessor-pairs */
import { logger } from "@/utils";
import type { ClientOptions, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { Client } from "discord.js";
import type SlashCommand from "./slashCommandDcBuilder";
import type { IMyErrorAPI, TMyErrorList } from "oh-my-error";

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
// Types
//--------------------------------

type Settings = {
	options?: ClientOptions;
	token: string;
};

//--------------------------------
// Functions
//--------------------------------

export class Bot {
	public client!: Client<boolean>;
	private settings: Required<Settings>;
	private logg = logger.child({ context: "Setup" });

	#commands = new Map<string, InstanceType<typeof SlashCommand>>();

	constructor(settings: Settings) {
		console.log("Bot constructor");
		this.settings = { ...settings, options: settings.options ?? { intents: [] } };
	}

	//TODO: FIX unknown = any, should be unknown = unknown
	set commands(
		commands:
			| Array<InstanceType<typeof SlashCommand>>
			| InstanceType<typeof SlashCommand>
			| Map<string, InstanceType<typeof SlashCommand>>
	) {
		if (Array.isArray(commands)) {
			this.#commands = new Map(commands.map(command => [command.name.toLowerCase(), command]));
			this.settings.options.intents = [...new Set(commands.flatMap(command => [...command.requiredIntents]))];
		}
	}

	public start() {
		this.client = new Client(this.settings.options);

		void this.client.login(this.settings.token).catch(() => {
			this.logg.log("emergency", MyErrorList.WRONG_TOKEN);
			process.exit(1);
		});

		this.commandListener();

		this.client.on("ready", () => {
			this.logg.info(`🎉 Logged in as ${this.client.user?.tag ?? "unknown user"}`);
			this.logg.info(`🏰 Serving ${this.client.guilds.cache.size.toLocaleString()} guilds`);
			this.logg.info(`👀 Watching ${this.client.channels.cache.size.toLocaleString()} channels`);
			this.logg.info(`👥 Ready to serve ${this.client.users.cache.size.toLocaleString()} users`);
		});
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering, accessor-pairs
	setCommands(
		...commands: Array<
			Array<InstanceType<typeof SlashCommand>> | InstanceType<typeof SlashCommand> | SlashCommandOptionsOnlyBuilder
		>
	): void {
		this.logg.info("Setting commands");
		this.commands = (
			commands as Array<Array<InstanceType<typeof SlashCommand>> | InstanceType<typeof SlashCommand>>
		).flat(1);
	}

	private commandListener() {
		void this.client.on("interactionCreate", interaction => {
			if (!interaction.isCommand()) return;
			const { commandName } = interaction;
			const command = this.#commands.get(commandName);
			if (command?.execute) command.execute(interaction);
			logger.info(
				`${command?.name} executed! User: ${interaction.user.globalName} | GuildID: ${interaction.guild?.id}`,
				{
					context: "Command",
					details: interaction
				}
			);
		});
	}
}
