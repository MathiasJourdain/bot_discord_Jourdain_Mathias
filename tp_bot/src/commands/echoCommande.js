const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Renvoie le texte fourni en argument.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Le texte à renvoyer.')
                .setRequired(false)),
    execute(interaction) {
        const text = interaction.options.getString('text') || 'Aucun texte fourni.';
        interaction.reply(`Vous avez écrit : "${text}"`);
    },
};
