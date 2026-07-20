import "dotenv/config";
import { REST, Routes, PermissionFlagsBits } from "discord.js";

const clientId = process.env.CLIENT_ID;

const commands = [
    {
        name: 'counter',
        description: 'Configurer le jeu de comptage',
        default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    }
];

const Rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await Rest.put(Routes.applicationCommands(clientId!), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();