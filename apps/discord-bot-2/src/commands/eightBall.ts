import { SlashCommandDcBuilder } from "@/classes";
import type { SlashCommandOptionsOnlyBuilder } from "discord.js";
import { PermissionFlagsBits } from "discord.js";

//----------------------
// Functions
//----------------------

export const eightBall = new SlashCommandDcBuilder()
	.setName("eightball")
	.setDescription("Magic 8Ball game!")
	.setRequiredPermissions([PermissionFlagsBits.SendMessages])
	.setExecute(async interaction => {
		const question = interaction.options.get("question")?.value as string;
		const responses = {
			positive: [
				"It is certain.",
				"It is decidedly so.",
				"Without a doubt.",
				"Yes - definitely.",
				"You may rely on it.",
				"As I see it, yes.",
				"Most likely.",
				"Outlook good.",
				"Yes.",
				"Signs point to yes."
			],
			neutral: [
				"Reply hazy, try again.",
				"Ask again later.",
				"Better not tell you now.",
				"Cannot predict now.",
				"Concentrate and ask again."
			],
			negative: [
				"Don't count on it.",
				"My reply is no.",
				"My sources say no.",
				"Outlook not so good.",
				"Very doubtful."
			]
		} as const;

		// Typescript Object.keys return string instead keyof, leave it
		const categories = Object.keys(responses) as unknown as keyof typeof responses;
		const randomCategory = categories[Math.floor(Math.random() * categories.length)] as keyof typeof responses;
		const response = responses[randomCategory][Math.floor(Math.random() * responses[randomCategory].length)];

		const colors = {
			positive: 0x00_ff_00, // Green
			neutral: 0xff_ff_00, // Yellow
			negative: 0xff_00_00 // Red
		} as const;

		await interaction.reply({
			content: "",
			embeds: [
				{
					color: colors[randomCategory],
					// title: "Magic 8-Ball",
					description: `**Question:** ${question}\n**Answer:** ${response}`,
					author: {
						name: "Magic Ball",
						// eslint-disable-next-line camelcase
						icon_url: "https://www.clipartmax.com/png/small/277-2776278_magic-8-ball-magic-8-ball-png.png" //TODO: Better Icon
					}
				}
			]
		});
	})
	.addStringOption(option =>
		option
			.setName("question")
			.setDescription("Ask 8ball about future!")
			.setRequired(true)
			.setMinLength(3)
			.setMaxLength(120)
	) as InstanceType<typeof SlashCommandDcBuilder> & SlashCommandOptionsOnlyBuilder;

export default eightBall;
