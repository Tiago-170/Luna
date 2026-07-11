import client from "../core/Client.js";
import PresenceService from "../services/PresenceService.js";
import ServerSyncService from "../services/ServerSyncService.js";

client.on('clientReady', (client) => {
    console.log(`Connecté en tant que ${client.user.tag}`);

    PresenceService.start(client);
});