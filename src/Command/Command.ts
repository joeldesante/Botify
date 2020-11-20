import { Client, Message, User } from 'discord.js';

export abstract class Command {

  /**
   * This function acts as the entry point for any given command.
   * It is expected that this will be called when the command is
   * called.
   * 
   * @param params The passed in parameters which the command can use to operate.
   */
  abstract execute(params: Array<string>, client: Client, sender: User, message: Message): void;

}