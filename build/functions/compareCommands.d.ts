import type { ApplicationCommand, GuildResolvable, ChatInputApplicationCommandData } from "discord.js";
declare function compareCommands(current: ApplicationCommand<{
    guild: GuildResolvable;
}> | undefined, goal: ChatInputApplicationCommandData): boolean;
export default compareCommands;
