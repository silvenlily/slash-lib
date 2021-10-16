import type { ChatInputApplicationCommandData, Client, Interaction } from "discord.js";

import SlashLib from "../../lib";

import compareCommands from "../../functions/compareCommands";
import sleep from "./sleep";

function testHandler(interaction: Interaction) {
  if (interaction.isCommand()) {
    interaction.reply(
      "This is a test command used by slash-lib's CI/CD testing and has no actual output"
    );
  }
}

async function runTest(command: ChatInputApplicationCommandData, bot: Client) {
  try {
    const slashLib = new SlashLib(bot, process.env.DEBUG_SERVER);
    slashLib.createCommand(command, testHandler);
    await slashLib.registerCommands();

    let currentCommand = (
      await slashLib.manager.fetch(undefined, {
        guildId: process.env.DEBUG_SERVER,
      })
    ).first();

    if (compareCommands(currentCommand, command)) {
      console.log(`Test passed: ${command.name}`);
      sleep(500);
      return true;
    } else {
      console.log(`Test failed: ${command.name}`);
      sleep(500);
      return false;
    }
  } catch (error) {
    console.log(`Error while running test: ${command.name} \n${error}`);
    sleep(500);
    return false;
  }
}

export default runTest;
