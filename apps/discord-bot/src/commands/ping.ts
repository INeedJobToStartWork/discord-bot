import { SlashCommandDcBuilder } from "@/utils";

//----------------------
// Functions
//----------------------

export const ping = new SlashCommandDcBuilder()
	.setName("ping")
	.setDescription("Replies with Pong!")
	.setExecute(interaction => {
		void interaction.reply("Pong!");
	});

export default ping;
