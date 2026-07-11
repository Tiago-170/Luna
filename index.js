import "dotenv/config";

import client from "./core/Client.js";

import "./events/readyEvent.js";
import "./events/interactionCreateEvent.js";
import "./events/MessageCreateEvent.js";
import "./events/guildCreate.js";
import "./events/guildDelete.js";

client.login(process.env.TOKEN);