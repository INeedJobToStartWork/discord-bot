import type { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

//----------------------
// Class
//----------------------

export class SlashCommandDcBuilder extends SlashCommandBuilder {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor, class-methods-use-this
	public execute: (interaction: CommandInteraction) => void = () => void 0;

	setExecute(execute: typeof this.execute): this {
		this.execute = execute;
		return this;
	}
}

export default SlashCommandDcBuilder;
