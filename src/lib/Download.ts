import { resolve } from 'path';
import { v4 as uuid } from 'uuid';
import wget from 'wget-improved';

export interface DownloadOutput {
  output: string,
  uuid: string
}

export class Download {
  static file(url: string): Promise<DownloadOutput> {
    const fileId = uuid();
    const output = `./temp/${fileId}.cpp`;
    const options = {};
    const download = wget.download(url, output, options);
    
    return new Promise((resolve, reject) => {
      download.on('error', function(err) {
        reject(err);
      });
      download.on('end', function(o) {
        resolve({
          output: output,
          uuid: fileId
        });
      });
    });
  }
}