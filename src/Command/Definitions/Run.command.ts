import { Command } from "../Command";
import { Client, Message, User } from 'discord.js';
import * as child from 'child_process';
import { MessageHandler } from "../../MessageHandler";

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

      MessageHandler.messageEmitter.on('message', (eventMessage: Message) => {
        if(eventMessage.author !== message.author)
          return;

        let content = message.content;
        if(!content.startsWith('\\'))
          return;

        console.log(content);
        content = content.slice(0,-1);
        console.log(content);
        return;
        
        process.stdin?.write(message.content);
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