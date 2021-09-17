import type { ChatInputApplicationCommandData } from "discord.js";

const basic: ChatInputApplicationCommandData = {
  name: "basic",
  description: "a test command used by slash-lib's CI testing",
};

const options: ChatInputApplicationCommandData = {
  name: "options",
  description: "a test command used by slash-lib's CI testing",
  options: [
    { name: "option-boolean", description: "a BOOLEAN option", type: "BOOLEAN" },
    { name: "option-channel", description: "a CHANNEL option", type: "CHANNEL" },
    //{ name: "optionMENTIONABLE", description: "a MENTIONABLE option", type: "MENTIONABLE" },
    //{ name: "optionINTEGER", description: "a INTEGER option", type: "INTEGER" },
    //{ name: "optionNUMBER", description: "a NUMBER option", type: "NUMBER" },
    //{ name: "optionROLE", description: "a ROLE option", type: "ROLE" },
    //{ name: "optionSTRING", description: "a STRING option", type: "STRING" },
    //{ name: "optionUSER", description: "a USER option", type: "USER" },
  ],
};

const choices: ChatInputApplicationCommandData = {
  name: "test-option-choices",
  description: "a test command used by slash-lib's CI testing",
  options: [
    {
      name: "choices-string",
      description: "a STRING option",
      type: "STRING",
      choices: [
        { name: "choice1", value: "value1" },
        { name: "choice2", value: "value2" },
        { name: "choice3", value: "value3" },
        { name: "choice4", value: "value4" },
      ],
    },
    {
      name: "choices-number",
      description: "a NUMBER option",
      type: "NUMBER",
      choices: [
        { name: "choice1", value: 1 },
        { name: "choice2", value: 2 },
        { name: "choice3", value: 3 },
        { name: "choice4", value: 4 },
      ],
    },
  ],
};

const commands = { basic: basic, options: options, choices: choices };

export default commands;
