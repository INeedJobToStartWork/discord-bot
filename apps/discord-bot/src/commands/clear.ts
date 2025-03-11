/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SlashCommandDcBuilder } from "@/utils";

//----------------------
// Functions
//----------------------

export const clear = new SlashCommandDcBuilder()
	.setName("clear")
	.setDescription("Clear chat!")
	.setExecute(async interaction => {})
	.addStringOption(option => option.setName("amount").setDescription("Amount messages to remove"));
export default clear;
