const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Renvoie la météo d\'un endroit aléatoire dans le monde.'),
    async execute(interaction) {
        try {
            // Votre clé d'API OpenWeatherMap (remplacez par votre propre clé)
            const apiKey = 'f616af01d6de24f0aa591c9f1b3f17b5';

            // Obtenez des coordonnées géographiques aléatoires
            const randomLat = Math.random() * 180 - 90;
            const randomLon = Math.random() * 360 - 180;

            // Construction de l'URL avec les coordonnées aléatoires
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${randomLat}&lon=${randomLon}&appid=${apiKey}&units=metric`;

            // Récupération des données météorologiques
            const response = await request(url);
            const weatherData = await response.body.json();

            // Vérifier si la réponse contient des données météorologiques valides
            if (weatherData.cod === 200) {
                const temperature = weatherData.main.temp;
                const description = weatherData.weather[0].description;

                // Marquer le nom de la ville en mentionnant l'utilisateur
                await interaction.reply(`la météo à un endroit aléatoire: ${description}, Température: ${temperature}°C et c'est à ${weatherData.name}.`);
            } else {
                // Répondre en cas d'erreur ou de données non valides
                await interaction.reply('Impossible de récupérer la météo pour un endroit aléatoire.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Erreur lors de la récupération de la météo.');
        }
    },
};
