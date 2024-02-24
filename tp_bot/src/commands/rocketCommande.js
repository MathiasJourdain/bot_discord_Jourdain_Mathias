const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rocket')
        .setDescription('Renvoie une équipe de Rocket League aléatoire.')
        .addStringOption(option =>
            option.setName('team')
                .setDescription('Le nom de l\'équipe.')
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            // Récupération des options
            const team = interaction.options.getString('team') || 'random';

            // Construction de l'URL avec les options et un paramètre aléatoire
            const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${encodeURIComponent(team)}`;

            // Récupération des données
            const response = await request(url);
            const result = await response.body.json();

            if (result.teams && result.teams.length > 0) {
                // Choix aléatoire d'une équipe
                const randomIndex = Math.floor(Math.random() * result.teams.length);
                const randomTeam = result.teams[randomIndex];

                // Répondre avec le logo de l'équipe
                await interaction.reply(`Logo de l'équipe ${randomTeam.strTeam}: ${randomTeam.strTeamBadge}`);
            } else {
                await interaction.reply(`Aucune équipe trouvée pour ${team}.`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Erreur lors de la récupération de l\'équipe Rocket League.');
        }
    },
};
