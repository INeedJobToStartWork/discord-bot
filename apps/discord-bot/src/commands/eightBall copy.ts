import { SlashCommandDcBuilder } from "@/utils";
import { PermissionFlagsBits } from "discord.js";

//----------------------
// Functions
//----------------------

export const EightBall = new SlashCommandDcBuilder()
	.setName("eightball")
	.setDescription("8Ball game!")
	.setRequiredPermissions([PermissionFlagsBits.SendMessages])
	.setExecute(async interaction => {
		console.log("asd");
	})
	.addStringOption(option =>
		option
			.setName("question")
			.setDescription("Ask 8ball about future!")
			.setRequired(true)
			.setMinLength(3)
			.setMaxLength(120)
	);

export default EightBall;
