import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";
import Utilisateur from "../models/Utilisateur.js";

class GuildCreateController extends Controller {

	/**
     * Gère l'événement de création d'un serveur Discord.
     *
     * @param {guild} guild - objet représentant le serveur discord et toutes les informations associées.
     */
	async execute(guild: any) {
		try {
			console.log(`Nouveau serveur : ${guild.name}`);

			await Serveur.createServer(guild.id, guild.name, guild.iconURL());
			const members = await guild.members.fetch();

			// Filtre les membres ayant le rôle d'administrateur.
			const admins = members.filter((member: any) =>
                member.permissions.has("Administrator")
            );

			// Synchronise les administrateurs du serveur avec la base de données.
            for (const admin of admins.values()) {
				await Utilisateur.addUser(admin.id, admin.user.username, admin.user.displayAvatarURL());

                await Serveur.syncAdmin(guild.id, admin.id);
            }

		} catch (error) {
			console.error("Erreur lors de l'enregistrement du serveur:", error);
		}
	}

}

export default GuildCreateController;
