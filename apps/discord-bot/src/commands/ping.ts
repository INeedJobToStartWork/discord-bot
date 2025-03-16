import { SlashCommandDcBuilder } from "@/utils";
import { translates } from "@/utils/translation";
import { MessageFlags } from "discord.js";
import { t } from "i18next";

//----------------------
// Functions
//----------------------

export const ping = new SlashCommandDcBuilder()
	.setName("ping")
	.setDescription("Replies with Pong!")
	.setDescriptionLocalizations(
		translates("ping:DescriptionLocalizations", {
			ns: "ping"
		})
	)
	.setExecute(async interaction => {
		const startTime = Date.now();
		await interaction.reply({ content: "Pinging...", flags: MessageFlags.Ephemeral });

		const pingTime = Date.now() - startTime;
		await interaction.editReply({
			content: "",
			embeds: [
				{
					title: "Pong! 🏓",
					description: t("execute.output.description", {
						ns: "ping",
						lng: interaction.locale,
						pingTime
					}),
					color: 0x00_ff_00,
					timestamp: new Date().toISOString(),
					footer: {
						text: t("execute.output.footer.text", { ns: "ping", lng: interaction.locale })
					}
				}
			]
		});
	});

export default ping;
