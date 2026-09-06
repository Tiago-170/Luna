import Groq from "groq-sdk";
import { Luna_prompt_fr } from '../variable/system_prompt.js';

type HistoricEntry = {
    bot: number | boolean;
    message: string;
    userName?: string | null;
};

type MemoireEntry = {
    contenu: string;
};

type IAResponse = {
    reponse: string;
    memoire?: string;
};

class IaService {
    private static getClient(): Groq {
        const apiKey = process.env.GROQ_API_1;

        if (!apiKey) {
            throw new Error("Aucune clé API Groq trouvée.");
        }

        return new Groq({ apiKey });
    }

    async generateResponse(message: string, author: string, historiques: HistoricEntry[] | null, authorMemoire: MemoireEntry[] | null): Promise<IAResponse> {
        const prompt = Luna_prompt_fr;

        if (!prompt) {
            return {
                reponse: "Désolé, je ne peux pas répondre pour le moment."
            };
        }

        const messages: Array<{
            role: "system" | "user" | "assistant";
            content: string;
        }> = [
            {
                role: "system",
                content: prompt
            }
        ];

        (historiques ?? []).forEach((historique) => {
            messages.push({
                role: historique.bot ? "assistant" : "user",
                content: historique.bot
                    ? historique.message
                    : `Message discord de ${historique.userName}: ${historique.message}`
            });
        });

        const memoireAuteur = authorMemoire?.[0];

        if (memoireAuteur) {
            messages.push({
                role: "system",
                content: `Mémoire sur ${author} : ${memoireAuteur.contenu}`
            });
        }

        messages.push({
            role: "user",
            content: `Message discord de ${author} : ${message}`
        });

        try {
            const groq = IaService.getClient();

            const reponse = await groq.chat.completions.create({
                model: "openai/gpt-oss-20b",
                messages,
                max_tokens: 400,
            });

            const contenu = reponse.choices[0]?.message?.content ?? "";

            let memoire: string | undefined;
            let reponseDiscord = contenu;

            if (contenu.includes("MEMOIRE:")) {
                const parts = contenu.split("MEMOIRE:");
                reponseDiscord = parts[0]?.trim() ?? "";
                memoire = parts[1]?.trim();
            } else if (contenu.includes("MEMOIRE :")) {
                const parts = contenu.split("MEMOIRE :");
                reponseDiscord = parts[0]?.trim() ?? "";
                memoire = parts[1]?.trim();
            }

            if (memoire) {
                return {
                    reponse: reponseDiscord,
                    memoire
                };
            }

            return {
                reponse: reponseDiscord
            };
        } catch (error) {
            console.error("Erreur Groq :", error);

            return {
                reponse: "Désolé, je n'ai pas pu contacter Groq pour le moment."
            };
        }
    }
}

export default IaService;