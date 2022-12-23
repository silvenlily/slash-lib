import type { ChatInputApplicationCommandData, Client } from "discord.js";
declare function runTest(command: ChatInputApplicationCommandData, bot: Client): Promise<boolean>;
export default runTest;
