import type { Client, Snowflake, ChatInputApplicationCommandData } from "discord.js";

declare module slashLib {
  /**
   * handles slash commands
   * @param client Client - discord.js client
   * @param debugServer Snowflake | undefined - (optional)
   */
  class SlashLib {
    constructor(client: Client, debugServer?: Snowflake);
  }
  /**
   * creates a command
   * @param command ChatInputApplicationCommandData - command to create
   * @param handler Function(interaction, arg2) - handler to run when command is used, handler will always be passed the interaction
   * @param arg2 any | undefined - (optional) second arg to pass to handler
   */
  function createCommand(
    command: ChatInputApplicationCommandData,
    handler: Function,
    arg2?: any
  ): void;

  /**
   * registers all commands created with createCommand()
   */
  function registerCommands(): Promise<void>;
}

export default slashLib;
