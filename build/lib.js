"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const compareCommands_1 = __importDefault(require("./functions/compareCommands"));
class SlashLib {
    constructor(client, debugServer) {
        this.debug = debugServer ?? false;
        if (!client.application) {
            throw new Error("SlashLib must be constructed after the ready event");
        }
        this.manager = client.application.commands;
        this.commands = new discord_js_1.Collection();
        this.client = client;
        this.commandRegister = [];
    }
    /**
     * adds a command
     * @param command command to add
     * @param handler handler to be run, will always be passed the interaction as its first item, and arg2 as its second
     * @param arg2 will be passed as the second argument to the handler when an interaction is triggered
     */
    createCommand(command, handler, arg2) {
        this.commandRegister.push({ command: command, handler: handler, arg2: arg2 });
    }
    /**
     * registers commands created with createCommand and removes commands not created by createCommand
     */
    async registerCommands() {
        let currentCommands;
        if (this.debug) {
            currentCommands = await this.manager.fetch(undefined, { guildId: this.debug });
        }
        else {
            currentCommands = await this.manager.fetch();
        }
        let commandRegister = this.commandRegister;
        let createCommands = [];
        // find all commands in commandRegister that dont have equivilant in currentCommands and add them to createCommands
        for (let i = 0; i < commandRegister.length; i++) {
            let goal = commandRegister[i].command;
            let current = currentCommands.find((cmd) => {
                if (cmd.name == goal.name) {
                    return true;
                }
                return false;
            });
            if ((0, compareCommands_1.default)(current, goal)) {
                this.commands.set(current.id, {
                    command: current,
                    handler: commandRegister[i].handler,
                    arg2: commandRegister[i].arg2,
                });
                currentCommands.delete(current.id);
            }
            else {
                createCommands.push(commandRegister[i]);
            }
        }
        // remove commands thats were not removed from currentCommands
        currentCommands.each(async (command) => {
            if (this.debug) {
                this.manager.delete(command, this.debug);
            }
            else {
                this.manager.delete(command);
            }
        });
        // add commands in createCommands
        if (this.debug) {
            for (let i = 0; i < createCommands.length; i++) {
                let cmd = await this.manager.create(createCommands[i].command, this.debug);
                this.commands.set(cmd.id, {
                    command: cmd,
                    handler: createCommands[i].handler,
                    arg2: createCommands[i].arg2,
                });
            }
        }
        else {
            for (let i = 0; i < createCommands.length; i++) {
                let cmd = await this.manager.create(createCommands[i].command);
                this.commands.set(cmd.id, {
                    command: cmd,
                    handler: createCommands[i].handler,
                    arg2: createCommands[i].arg2,
                });
            }
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
exports.default = SlashLib;
