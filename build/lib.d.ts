import type { Client, ChatInputApplicationCommandData, ApplicationCommand, GuildResolvable, Snowflake } from "discord.js";
import { ApplicationCommandManager, Collection } from "discord.js";
declare namespace slashLib {
    type command = {
        command: ApplicationCommand<{
            guild: GuildResolvable;
        }>;
        handler: Function;
        arg2?: any;
    };
    type commandData = {
        command: ChatInputApplicationCommandData;
        handler: Function;
        arg2?: any;
    };
}
declare class SlashLib {
    commandRegister: slashLib.commandData[];
    commands: Collection<string, slashLib.command>;
    manager: ApplicationCommandManager;
    client: Client;
    debug: Snowflake | false;
    constructor(client: Client, debugServer?: Snowflake);
    /**
     * adds a command
     * @param command command to add
     * @param handler handler to be run, will always be passed the interaction as its first item, and arg2 as its second
     * @param arg2 will be passed as the second argument to the handler when an interaction is triggered
     */
    createCommand(command: ChatInputApplicationCommandData, handler: Function, arg2?: any): void;
    /**
     * registers commands created with createCommand and removes commands not created by createCommand
     */
    registerCommands(): Promise<void>;
}
export default SlashLib;
