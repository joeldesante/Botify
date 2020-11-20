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

export class Compile extends Command {
  execute(params: Array<string>, client: Client, sender: User, message: Message): void {

    let p = new Promise<DownloadOutput>((resolve, reject) => {
      
      message.channel.send('📦\tDownloading contents...');
      
      const url = message.attachments.first()?.url;
      if(url === undefined){
        throw new Error("Fuck you joel.");
      }
    
      const fileId = uuid();
      const output = `./temp/${fileId}.cpp`;
      const options = {};
      const download = wget.download(url, output, options);
      
      download.on('error', function(err) {
        reject(err);
      });
      
      download.on('end', function(o) {
        resolve({
          output: output,
          uuid: fileId
        });
      });
    })
    .then((output: DownloadOutput) => {
      message.channel.send(`
        📌\tDownloaded File.\n\`\`\`yaml\nUUID: ${output.uuid}\`\`\`\n
      `);

      return this.compileCode(output.output, output.uuid);
    })
    .catch(err => {
      console.log(err);
      message.channel.send(`🚫\tDownloaded **Failed**.`);
    });
  }

  private compileCode(path: string, uuid: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const process = child.exec(`g++ -g ${path} -o ./temp/bin/${uuid}.e`);
      process.on('error', (err)=>{
        reject(err);
      });

      process.on('exit', (code, signal) => {
        resolve();
      });
    });
  }
}