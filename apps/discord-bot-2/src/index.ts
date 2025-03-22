import { TOKEN } from "@/utils/envVariables";
import { Bot } from "./classes";
import { clear, eightBall, ping } from "./commands";

//--------------------------------
// App Setup
//--------------------------------

export const bot = new Bot({
	token: TOKEN
});
bot.setCommands([ping, clear, eightBall]);
bot.start();
