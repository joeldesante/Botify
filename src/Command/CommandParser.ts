import { CompiBot } from "../CompiBot";
import { Command } from "./Command";
import config from '../config/config.json';

export class CommandParser {
  /**
   * parse
   */
  public parse(input: string): any {

    const chunked = input.split(' ');
    if(!chunked[0].startsWith(config.prefix)) {
      return undefined;
    }
    const commandName = chunked[0].slice(1);
    const commandPrototype: Command | undefined = CompiBot.commandManager.fetchCommand(commandName);
    chunked.shift() // Remove the first element
    const commandParams = chunked;
    if(commandPrototype !== undefined) {
      return { 
        command: commandPrototype, 
        params: commandParams
      };
    }
    return undefined;
  }
}
