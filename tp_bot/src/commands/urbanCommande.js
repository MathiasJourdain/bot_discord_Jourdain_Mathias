const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Recherche la définition d\'un terme sur Urban Dictionary.')
        .addStringOption(option =>
            option.setName('terme')
                .setDescription('Le terme à rechercher.')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            // Récupération du terme à rechercher depuis les options
            const terme = interaction.options.getString('terme');

            // Construction de l'URL de l'API Urban Dictionary
            const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(terme)}`;

            // Appel à l'API Urban Dictionary
            const response = await request(apiUrl);
            const { list } = await response.body.json();

            if (list && list.length > 0) {
                // Récupération de la première définition de la liste
                const definition = list[0].definition;

                // Répondre avec la définition
                await interaction.reply(`**${terme}** : ${definition}`);
            } else {
                // Aucune définition trouvée
                await interaction.reply(`Aucune définition trouvée pour **${terme}**.`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Erreur lors de la recherche de la définition sur Urban Dictionary.');
        }
    },
};
