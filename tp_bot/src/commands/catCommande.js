const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Renvoie une photo aléatoire.')
        .addIntegerOption(option =>
            option.setName('h')
                .setDescription('La hauteur de l\'image.')
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('w')
                .setDescription('La largeur de l\'image.')
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            // Récupération des options
            const h = interaction.options.getInteger('h') || 500;
            const w = interaction.options.getInteger('w') || 300;

            // Construction de l'URL avec les options et un paramètre aléatoire
            const photoUrl = `https:"//picsum.photos/seed/634/253/169"`;

            // Répondre avec l'image aléatoire
            await interaction.reply(photoUrl);
        } catch (error) {
            console.error(error);
        }
    },
};