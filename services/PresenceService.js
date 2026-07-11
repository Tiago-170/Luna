import { ActivityType } from 'discord.js';

class PresenceService {

    static async start(client) {
        setInterval(() => {
            setTimeout(() => {
                client.user.setPresence({
                    activities: [{ 
                        name: "✨ Version : 2.0.1", 
                        type: ActivityType.Watching,
                        url: "https://test.fr" 
                    }],
                    status: 'online',
                });
            }, 5000);
            setTimeout(() => {
                client.user.setPresence({
                    activities: [{ 
                        name: "🌐 https://test.fr", 
                        type: ActivityType.Watching,
                        url: "https://test.fr", 
                    }],
                    status: 'online',
                });
            }, 10000);
            setTimeout(() => {
                client.user.setPresence({
                    activities: [{ 
                        name: "👋 Mentionne-moi pour discuter !", 
                        type: ActivityType.Watching,
                        url: "https://test.fr", 
                    }],
                    status: 'online',
                });
            }, 15000);
        }, 15000);
    }
    
}

export default PresenceService;