const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Renvoie des informations sur un utilisateur.')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur dont vous voulez obtenir des informations.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;

        // Vérifiez si l'utilisateur est un membre du serveur
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            await interaction.reply(`Tag de l'utilisateur: ${user.tag}\nDate d'arrivée sur le serveur: ${member.joinedAt}`);
        } 
    },
};


