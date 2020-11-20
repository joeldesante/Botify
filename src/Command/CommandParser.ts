import { CompiBot } from "../CompiBot";
import { Command } from "./Command";

export class CommandParser {
  /**
   * parse
   */
  public parse(input: string): any {

    // FIXME Make it work with the config
    const chunked = input.split(' ');
    if(!chunked[0].startsWith(';')) {
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