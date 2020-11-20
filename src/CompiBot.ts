import { Client, Message } from 'discord.js';
import { MessageHandler } from './MessageHandler';
import { CommandManager } from './Command/CommandManager'
import config from '../config/config.json';
import { Compile } from './Command/Definitions/Compile.command';
import { Run } from './Command/Definitions/Run.command';

export class CompiBot {

  // NOTE: Only one should exist. Making this static decreases coupling a little.
  public static commandManager: CommandManager = new CommandManager();

  private client: Client;
  private readonly token: string;
  private messageHandler: MessageHandler;

  constructor() {
    this.client = new Client();
    this.token = config.token;
    this.messageHandler = new MessageHandler(this.client);

    // Register commands
    this.registerCommands();
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => this.messageHandler.handle(message));
    return this.client.login(this.token);
  }

  private registerCommands(): void {
    CompiBot.commandManager.registerCommand("compile", new Compile());
    CompiBot.commandManager.registerCommand("run", new Run());
  }
}