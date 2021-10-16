import type { ChatInputApplicationCommandData } from "discord.js";

const basic: ChatInputApplicationCommandData = {
  name: "basic",
  description: "a test command used by slash-lib's CI testing",
};

const options: ChatInputApplicationCommandData = {
  name: "options",
  description: "a test command used by slash-lib's CI testing",
  options: [
    { name: "option-boolean", description: "a boolean option", type: "BOOLEAN" },
    { name: "option-channel", description: "a channel option", type: "CHANNEL" },
    { name: "option-mentionable", description: "a mentionable option", type: "MENTIONABLE" },
    { name: "option-integer", description: "a integer option", type: "INTEGER" },
    { name: "option-number", description: "a number option", type: "NUMBER" },
    { name: "option-role", description: "a role option", type: "ROLE" },
    { name: "option-string", description: "a string option", type: "STRING" },
    { name: "option-user", description: "a user option", type: "USER" },
  ],
};

const choices: ChatInputApplicationCommandData = {
  name: "test-option-choices",
  description: "a test command used by slash-lib's CI testing",
  options: [
    {
      name: "choices-string",
      description: "a string option",
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
      description: "a number option",
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

const subcommand: ChatInputApplicationCommandData = {
  name: "subcommand",
  description: "a test command used by slash-lib's CI testing",
  options: [
    {
      name: "sub1",
      description: "a subcommand used by slash-lib's CI testing",
      type: "SUB_COMMAND",
    },
    {
      name: "sub2",
      description: "a subcommand used by slash-lib's CI testing",
      type: "SUB_COMMAND",
      options: [
        { name: "option-number", description: "a number option", type: "NUMBER" },
        {
          name: "choices-number",
          description: "a number option",
          type: "NUMBER",
          choices: [
            { name: "choice1", value: 1 },
            { name: "choice2", value: 2 },
            { name: "choice3", value: 3 },
            { name: "choice4", value: 4 },
          ],
        },
      ],
    },
    {
      name: "sub3",
      description: "a subcommand used by slash-lib's CI testing",
      type: "SUB_COMMAND",
      options: [
        { name: "option-number", description: "a number option", type: "NUMBER", required: true },
        {
          name: "choices-number",
          description: "a number option",
          type: "NUMBER",
          required: true,
          choices: [
            { name: "choice1", value: 1 },
            { name: "choice2", value: 2 },
            { name: "choice3", value: 3 },
            { name: "choice4", value: 4 },
          ],
        },
      ],
    },
  ],
};

const subcommandGroup: ChatInputApplicationCommandData = {
  name: "subcommandgroup",
  description: "a test command used by slash-lib's CI testing",
  options: [
    {
      name: "subgroupa",
      description: "a subcommandgroup used by slash-lib's CI testing",
      type: "SUB_COMMAND_GROUP",
      options: [
        {
          name: "cmda1",
          description: "a subcommand used by slash-lib's CI testing",
          type: "SUB_COMMAND",
        },
        {
          name: "cmda2",
          description: "a subcommand used by slash-lib's CI testing",
          type: "SUB_COMMAND",
        },
      ],
    },
    {
      name: "subgroupb",
      description: "a subcommandgroup used by slash-lib's CI testing",
      type: "SUB_COMMAND_GROUP",
      options: [
        {
          name: "cmdb1",
          description: "a subcommand used by slash-lib's CI testing",
          type: "SUB_COMMAND",
          options: [
            { name: "option-boolean", description: "a boolean option", type: "BOOLEAN" },
            { name: "option-channel", description: "a channel option", type: "CHANNEL" },
          ],
        },
        {
          name: "cmdb2",
          description: "a subcommand used by slash-lib's CI testing",
          type: "SUB_COMMAND",
          options: [
            { name: "option-string", description: "a string option", type: "STRING" },
            { name: "option-user", description: "a user option", type: "USER" },
          ],
        },
      ],
    },
  ],
};

const commands = {
  basic: basic,
  options: options,
  choices: choices,
  subcommand: subcommand,
  subcommandGroup: subcommandGroup,
};

export default commands;
