import * as dotenv from "dotenv";
import { CompiBot } from "./CompiBot";
import { MessageHandler } from "./MessageHandler";

let Bot = new CompiBot();
Bot.listen();