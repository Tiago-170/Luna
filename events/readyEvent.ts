import client from "../core/Client.js";
import PresenceService from "../services/PresenceService.js";
import ServerSyncService from "../services/ServerSyncService.js";

client.on("clientReady", async (client) => {
    PresenceService.start(client);

    try {
        await ServerSyncService.sync(client);
    } catch (error) {
        console.error("Erreur lors de la synchronisation des serveurs:", error);
    }
});