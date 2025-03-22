import { SlashCommandDcBuilder } from "@/classes";
import type { SlashCommandOptionsOnlyBuilder } from "discord.js";
import { ChannelType, GatewayIntentBits, MessageFlags, PermissionFlagsBits } from "discord.js";
import { bot } from "..";

//----------------------
// Functions
//----------------------

export const clear = new SlashCommandDcBuilder()
	.setName("clear")
	.setDescription("Clear chat!")
	.setRequiredIntents([GatewayIntentBits.Guilds])
	.setRequiredPermissions([PermissionFlagsBits.ManageMessages])
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
	.setExecute(async interaction => {
		await interaction.reply({ content: "Removing...", flags: MessageFlags.Ephemeral });
		const amount = interaction.options.get("amount")?.value as number;
		const channelID = `${interaction.options.get("channel")?.value ?? interaction.channelId}`;

		await bot.client.channels.fetch(channelID);
		const channel = bot.client.channels.cache.get(channelID);

		if (!(channel?.isTextBased() && !channel.isDMBased())) {
			return interaction.editReply({
				content: "",
				embeds: [
					{
						color: 0xff_00_00,
						title: "Error",
						description: "I can't remove messages here!"
					}
				]
			});
		}

		await channel.bulkDelete(amount, true);
		return interaction.editReply({
			content: "",
			embeds: [
				{
					color: 0x00_ff_00,
					title: "Success",
					description: `Successfully deleted ${amount} messages in ${channel}!`
				}
			]
		});
	})
	.addNumberOption(option =>
		option
			.setName("amount")
			.setDescription("Amount messages to remove")
			.setRequired(true)
			.setMinValue(2)
			.setMaxValue(100)
	)
	.addChannelOption(option =>
		option.setName("channel").setDescription("Channel to remove messages").addChannelTypes(ChannelType.GuildText)
	) as InstanceType<typeof SlashCommandDcBuilder> & SlashCommandOptionsOnlyBuilder;

export default clear;
