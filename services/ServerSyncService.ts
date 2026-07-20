import ServerSyncController from "../controllers/ServerSyncController.js";

class ServerSyncService {

    static async sync(client: any) {

        const serverSyncController = new ServerSyncController();

        console.log("Synchronisation des serveurs...");

        for (const guild of client.guilds.cache.values()) {

            console.log(`Serveur trouvé : ${guild.name}`);

            await serverSyncController.syncServer(guild);

            const members = await guild.members.fetch();

            const admins = members.filter((member: any) =>
                member.permissions.has("Administrator")
            );


            for (const admin of admins.values()) {
                await serverSyncController.syncAdmin(guild, admin);

            }

        }

        console.log("Synchronisation terminée.");

    }

}

export default ServerSyncService;