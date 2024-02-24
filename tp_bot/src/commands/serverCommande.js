const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Renvoie des informations sur le serveur.')
        .addStringOption(option =>
            option.setName('serveur')
                .setDescription('Le serveur dont vous voulez obtenir des informations.')
                .setRequired(false)),
    async execute(interaction) {
        const server = interaction.guild.name;
        const memberCount = interaction.guild.memberCount;
        await interaction.reply(`Nom du serveur: ${server}\nNombre de membres: ${memberCount}`);
    },
};
