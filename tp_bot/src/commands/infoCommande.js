const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Renvoie des informations sur un utilisateur ou sur le serveur.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Renvoie des informations sur un utilisateur.')
                .addUserOption(option =>
                    option.setName('utilisateur')
                        .setDescription('L\'utilisateur dont vous voulez obtenir des informations.')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('serveur')
                .setDescription('Renvoie des informations sur le serveur.')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('utilisateur') || interaction.user;

            // Vérifiez si l'utilisateur est un membre du serveur
            const member = interaction.guild.members.cache.get(user.id);

            if (member) {
                await interaction.reply(`Tag de l'utilisateur: ${user.tag}\nDate d'arrivée sur le serveur: ${member.joinedAt}`);
            } else {
                await interaction.reply(`Tag de l'utilisateur: ${user.tag}`);
            }
        } else if (interaction.options.getSubcommand() === 'serveur') {
            const server = interaction.guild.name;
            const memberCount = interaction.guild.memberCount;
            await interaction.reply(`Nom du serveur: ${server}\nNombre de membres: ${memberCount}`);
        }
    },
};