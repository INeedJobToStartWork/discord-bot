import { SlashCommandBuilder } from "discord.js";
import type { ClientOptions, CommandInteraction, PermissionResolvable } from "discord.js";
import type { IMyError, TMyErrorList } from "oh-my-error";

//----------------------
// Constants
//----------------------

const MyError = {
	MISSING_PERMISSIONS: {
		code: "MISSING_PERMISSIONS",
		name: "Missing Permissions",
		message: "I don't have the required permissions to perform this action",
		hint: (permission: string) => `Give ${permission} to bot.`
	}
} as const satisfies TMyErrorList<IMyError>;

//----------------------
// Class
//----------------------

export class SlashCommandDcBuilder extends SlashCommandBuilder {
	//==================
	// Public Properties

	/** Store intents to include */
	public requiredIntents = new Set<ClientOptions["intents"]>();
	/** Store permissions to check */
	public requiredPermissions = new Set<PermissionResolvable>();
	/** Store function to execute */
	public toExecute: (interaction: CommandInteraction) => void = () => void 0;

	//==================
	// Public Methods

	/**
	 * Execute function with order
	 *
	 * - Permission Checker  (You can set that by `setRequiredPermissions`)
	 * - Execute `toExecute` (You can set that by `setExecute`)
	 *
	 * @param interaction - interaction from Discord Event
	 */
	public execute: typeof this.toExecute = async interaction => {
		if (
			this.requiredPermissions.size > 0 &&
			!interaction.guild?.members.me?.permissions.has([...this.requiredPermissions])
		) {
			//TODO: Better Message
			return interaction.reply({
				content: "",
				embeds: [
					{
						color: 0xff_00_00,
						title: MyError.MISSING_PERMISSIONS.name,
						description: MyError.MISSING_PERMISSIONS.message
						// description: `**Description**: ${MyError.MISSING_PERMISSIONS.message} \n **Hint**: ${MyError.MISSING_PERMISSIONS.hint(PermissionFl)}`
					}
				]
			});
		}
		this.toExecute(interaction);
		return void 0;
	};

	/**
	 * Sets Permissions required by Bot to work.
	 *
	 * @params requiredPermissions - Array of Permissions required
	 * @returns this
	 *
	 * @example
	 * ```
	 * .setRequiredPermissions([PermissionFlagsBits.ManageMessages])
	 * ```
	 */
	public setRequiredPermissions(requiredPermissions: PermissionResolvable[]): this {
		this.requiredPermissions = new Set(requiredPermissions);
		return this;
	}

	public setRequiredIntents(requiredIntents: ClientOptions["intents"]): this {
		this.requiredIntents = new Set(Array.isArray(requiredIntents) ? requiredIntents : [requiredIntents]);
		return this;
	}

	/**
	 * Sets Function to Execute
	 *
	 * @params toExecute - Function to Execute
	 * @returns this
	 *
	 * @example
	 * ```
	 * .setExecute(()=>{...})
	 * ```
	 */
	public setExecute(toExecute: typeof this.toExecute): this {
		this.toExecute = toExecute;
		return this;
	}

	//-----------------------------
	// Overridden Methods
	//-----------------------------

	// public override addAttachmentOption = (
	// 	option: Parameters<SlashCommandBuilder["addAttachmentOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this =>
	// 	super.addAttachmentOption(option) as SlashCommandOptionsOnlyBuilder & this;

	// public override addBooleanOption = (
	// 	option: Parameters<SlashCommandBuilder["addBooleanOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this => super.addBooleanOption(option) as SlashCommandOptionsOnlyBuilder & this;

	// // public override addNumberOption = (
	// // 	option: Parameters<SlashCommandBuilder["addIntegerOption"]>[0]
	// // ): SlashCommandOptionsOnlyBuilder & this => super.addIntegerOption(option) as SlashCommandOptionsOnlyBuilder & this;

	// public override addMentionableOption = (
	// 	option: Parameters<SlashCommandBuilder["addMentionableOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this =>
	// 	super.addMentionableOption(option) as SlashCommandOptionsOnlyBuilder & this;

	// public override addChannelOption = (
	// 	option: Parameters<SlashCommandBuilder["addChannelOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this => {
	// 	SlashCommandBuilder.prototype.addChannelOption.call(this, option);
	// 	return this;
	// 	// super.addChannelOption(option) as SlashCommandOptionsOnlyBuilder & this;
	// 	// return this;
	// };

	// public override addNumberOption = (
	// 	option: Parameters<SlashCommandBuilder["addNumberOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this => {
	// 	SlashCommandBuilder.prototype.addNumberOption.call(this, option);
	// 	return this;
	// 	// super.addNumberOption(option) as SlashCommandOptionsOnlyBuilder & this;
	// 	// return this;
	// };

	// public override addStringOption = (
	// 	option: Parameters<SlashCommandBuilder["addStringOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this => super.addStringOption(option) as SlashCommandOptionsOnlyBuilder & this;

	// public override addRoleOption = (
	// 	option: Parameters<SlashCommandBuilder["addRoleOption"]>[0]
	// ): SlashCommandOptionsOnlyBuilder & this => super.addRoleOption(option) as SlashCommandOptionsOnlyBuilder & this;
}

export default SlashCommandDcBuilder;
