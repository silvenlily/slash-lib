import type { Client, Interaction } from "discord.js";

import SlashLib from "../../lib";

function testHandler(interaction: Interaction) {
  if (interaction.isCommand()) {
    interaction.reply(
      "This is a test command used by slash-lib's CI/CD testing and has no actual output"
    );
  }
}

async function runTest(command: any, bot: Client) {
  console.log(`Running test: ${command.name}`);
  const slashLib = new SlashLib(bot, process.env.DEBUG_SERVER);
  slashLib.createCommand(command, testHandler);
  await slashLib.registerCommands();
}

export default runTest;
