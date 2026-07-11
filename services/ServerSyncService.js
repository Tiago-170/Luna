import ServeurModel from "../models/Serveur.js";
import UtilisateurModel from "../models/Utilisateur.js";

class ServerSyncService {

    static async sync(client) {

        console.log("Synchronisation des serveurs...");

        for (const guild of client.guilds.cache.values()) {

            console.log(`Serveur trouvé : ${guild.name}`);

            // Enregistre le serveur
            await ServeurModel.create({
                id: guild.id,
                nom: guild.name,
                icon: guild.iconURL()
            });


            // Récupération des membres
            const members = await guild.members.fetch();


            // Administrateurs
            const admins = members.filter(member =>
                member.permissions.has("Administrator")
            );


            for (const admin of admins.values()) {

                await UtilisateurModel.create({
                    id: admin.id,
                    pseudo: admin.user.username,
                    icon: admin.user.displayAvatarURL()
                });


                await ServeurModel.addAdmin(
                    guild.id,
                    admin.id
                );

            }

        }

        console.log("Synchronisation terminée.");

    }

}

export default ServerSyncService;