import "dotenv/config";
import { REST, Routes, PermissionFlagsBits } from "discord.js";

const clientId = process.env.CLIENT_ID;

// Définir les commandes de l'application
const commands = [
    {
        name: 'counter',
        description: 'Configurer le jeu de comptage',
        default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    }
];

const Rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

// Enregistrer les commandes de l'application auprès de l'API Discord
(async () => {
    try {
        await Rest.put(Routes.applicationCommands(clientId!), { body: commands });
    } catch (error) {
        console.error(error);
    }
})();