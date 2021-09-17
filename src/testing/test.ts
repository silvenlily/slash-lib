import { Client, Intents } from "discord.js";

import SlashLib from "../lib";

import commandList from "./testCommands";
import doSetup from "./utils/doSetup";
import sleep from "./utils/sleep";
import runTest from "./utils/runTest";

doSetup();

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", async () => {
  console.log("Connected! conducting tests");

  //test one
  await runTest(commandList.basic, bot);
  sleep(500);

  //test two
  await runTest(commandList.options, bot);
  sleep(500);

  //test three
  await runTest(commandList.choices, bot);
  sleep(500);

  console.log("tests passed!");
  bot.destroy();
});
