import type { ChatInputApplicationCommandData, Snowflake } from "discord.js";

declare namespace slashLib {
  type command = {
    discordID: Snowflake;
    command: ApplicationCommand<{ guild: GuildResolvable }>;
    handler: Function;
    arg2?: any;
    guild?: Snowflake;
  };

  type createCommandOptions = {
    identifier: string;
    command: ChatInputApplicationCommandData;
    handler: Function;
    arg2?: any;
    guild?: Snowflake;
  };

  type interaction = {
    id: a;
  };
}

export default slashLib;
