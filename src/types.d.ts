import type { ChatInputApplicationCommandData, Snowflake } from "discord.js";

declare namespace slashLib {
  type command = {
    command: ApplicationCommand<{ guild: GuildResolvable }>;
    handler: Function;
    arg2?: any;
  };

  type commandData = {
    command: ChatInputApplicationCommandData;
    handler: Function;
    arg2?: any;
  };

}

export default slashLib;
