import { Command } from "../Command";
import { Client, Message, User } from 'discord.js';
import config from '../../../config/config.json';
import { v4 as uuid } from 'uuid';
import wget from 'wget-improved';
import * as child from 'child_process';

export interface DownloadOutput {
  output: string,
  uuid: string
}

export class Run extends Command {
  execute(params: Array<string>, client: Client, sender: User, message: Message): void {

    let p = new Promise<string>((resolve, reject) => {
      if(params.length < 1) {
        reject(new Error('No uuid provided.'));
        return;
      } 
      resolve(params[0]);
    }).then((name) => {
      message.channel.send(`👍\tExecuting ${params[0]}\n`);
      return this.runCode(name, message);
    })
    .catch(err => {
      console.log(err);
      message.channel.send(`🚫\tExecution **Failed**.`);
    });
  }

  private runCode(name: string, message: Message): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      const process = child.execFile(`./temp/bin/${name}.e`);

      process.on('error', (err)=>{
        reject(err);
      });

      process.stdout?.on('data', (data) => {
        console.log(data);
        message.channel.send(data);
      })

      process.on('exit', (code, signal) => {
        resolve();
      });
    });
  }
}