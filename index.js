import "dotenv/config";

import client from "./core/Client.js";
import "./core/Command.js";

import "./events/readyEvent.js";
import "./commands/interactionCommand.js";
import "./events/MessageCreateEvent.js";
import "./events/guildCreate.js";
import "./events/guildDelete.js";

client.login(process.env.TOKEN);