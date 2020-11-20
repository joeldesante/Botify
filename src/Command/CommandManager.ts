import { Collection } from "discord.js";
import { Command } from "./Command";

export class CommandManager {

  private registeredCommands: Collection<string, Command>;

  constructor() {
    this.registeredCommands = new Collection<string, Command>();
  }

  /**
   * Registers a command into the manager
   * @param commandName The base word that must be used to execute this command.
   * @param command The actual command type which will be manifested
   */
  public registerCommand(commandName: string, command: Command): void {
    commandName = commandName.toLowerCase();  // Standardize the names
    this.registeredCommands.set(commandName, command);
  }

  /**
   * fetchCommand
   */
  public fetchCommand(commandName: string): Command | undefined {
    commandName = commandName.toLowerCase();  // Standardize the names
    return this.registeredCommands.get(commandName);
  }
}