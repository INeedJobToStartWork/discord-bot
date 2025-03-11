import { SlashCommandDcBuilder } from "@/utils";

//----------------------
// Functions
//----------------------

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const ping = new SlashCommandDcBuilder()
	.setName("ping")
	.setDescription("Replies with Pong!")
	.setExecute(async interaction => {
		const startTime = Date.now();
		await interaction.reply({ content: "Pinging...", ephemeral: true });

		const pingTime = Date.now() - startTime;
		await interaction.editReply({
			content: "",
			embeds: [
				{
					title: "Pong! 🏓",
					description: `Latency: ${pingTime}ms`,
					color: 0x00_ff_00,
					timestamp: new Date().toISOString(),
					footer: {
						text: "Ping command"
					}
				}
			]
		});
	});

export default ping;
