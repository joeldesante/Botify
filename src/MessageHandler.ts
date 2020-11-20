import { Client, Message, User } from 'discord.js';
import { send } from 'process';
import { Command } from './Command/Command';
import { CommandManager } from './Command/CommandManager';
import { CommandParser } from './Command/CommandParser';

export class MessageHandler {

  private client: Client;
  private commandParser: CommandParser;

  constructor(client: Client) {
    this.client = client;
    this.commandParser = new CommandParser();
  }

  public handle(message: Message): void {

    let { "content": rawMessage, "author": sender, attachments } = message;
    const commandData = this.commandParser.parse(rawMessage);
    if(commandData === undefined) {
      return;
    }
    
    commandData.command.execute(commandData.params, this.client, sender, message);

    /*if((message.author.id != this.client.user!.id) && (message.channel.id == "775779299369812009")) {
      message.reply("Oh yes. Joel is so cool. Joel is the coolest guy in the world. He likes to cook too ladies!");
    }*/
  }
}