import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";
import Utilisateur from "../models/Utilisateur.js";

class GuildCreateController extends Controller {

	async execute(guild) {
		try {
			console.log(`Nouveau serveur : ${guild.name}`);

			await Serveur.createServer(guild.id, guild.name, guild.iconURL());
			const members = await guild.members.fetch();

            const admins = members.filter(member =>
                member.permissions.has("Administrator")
            );

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
