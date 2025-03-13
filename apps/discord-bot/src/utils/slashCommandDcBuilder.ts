import { SlashCommandBuilder } from "discord.js";
import type { CommandInteraction, PermissionResolvable } from "discord.js";
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

	/** Store permissions to check */
	public requiredPermissions: PermissionResolvable[] = [];
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
			this.requiredPermissions.length > 0 &&
			!interaction.guild?.members.me?.permissions.has(this.requiredPermissions)
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
	public setRequiredPermissions(requiredPermissions: typeof this.requiredPermissions): this {
		this.requiredPermissions = requiredPermissions;
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
}

export default SlashCommandDcBuilder;
