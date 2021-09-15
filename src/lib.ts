import type slashLib from "./types";
import type { Client, ChatInputApplicationCommandData } from "discord.js";

import { ApplicationCommandManager, Collection } from "discord.js";
import { EventEmitter } from "stream";

import compareCommands from "./functions/compareCommands";

class commandHandler extends EventEmitter {
  commandRegister: slashLib.commandData[];
  commands: Collection<string, slashLib.command>;
  manager: ApplicationCommandManager;
  client: Client;
  constructor(client: Client) {
    super();
    this.manager = new ApplicationCommandManager(client);
    this.commands = new Collection();
    this.client = client;
    this.commandRegister = [];
  }

  /**
   * adds a command
   * @param command 
   * @param handler 
   * @param arg2
   */
  createCommand(command:ChatInputApplicationCommandData, handler: Function, arg2:any) {
    this.commandRegister.push({command:command,handler:handler,arg2:arg2});
  }

  async registerCommands() {
    let currentCommands = await this.manager.fetch();
    let commandRegister = this.commandRegister;

    let createCommands: slashLib.commandData[] = [];

    // find all commands in commandRegister that dont have equivilant in currentCommands and add them to createCommands
    for (let i = 0; i < commandRegister.length; i++) {
      let goal = commandRegister[i].command;

      let current = currentCommands.find((cmd) => {
        if (cmd.name == goal.name) {
          return true;
        }
        return false;
      });

      if (compareCommands(current, goal)) {
        this.commands.set(current!.id, {
          command: current!,
          handler: commandRegister[i].handler,
          arg2: commandRegister[i].arg2,
        });
        currentCommands.delete(current!.id);
      } else {
        createCommands.push(commandRegister[i]);
      }
    }

    // remove commands thats were not removed from currentCommands
    currentCommands.each(async (command) => {
      this.manager.delete(command);
    });

    // add commands in createCommands
    for (let i = 0; i < createCommands.length; i++) {
      let cmd = await this.manager.create(createCommands[i].command);
      this.commands.set(cmd.id, {
        command: cmd,
        handler: createCommands[i].handler,
        arg2: createCommands[i].arg2,
      });
    }

    // this allows access inside of the event, given that 'this' will different
    let cmds = this.commands;

    // add event listener
    this.client.on("interactionCreate", (interaction) => {
      if (interaction.isCommand()) {
        let cmd = cmds.get(interaction.commandId);
        if (cmd) {
          cmd.handler(interaction, cmd.arg2);
        }
      }
    });
  }
}

export default commandHandler;
