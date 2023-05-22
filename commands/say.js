const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Enviar mensagem através do Moderator.')
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('O canal de texto para enviar a mensagem.')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
            .setDescription('A mensagem a ser enviada.')
            .setRequired(true))
        .addBooleanOption(option =>
            option.setName('embed')
            .setDescription('Incluir um embed na mensagem?')
            .setRequired(false)
        ),
    run: async ({ interaction, client }) => {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');
        const useEmbed = interaction.options.getBoolean('embed');

        if (useEmbed) {
            // Criar um novo embed
            const embed = new EmbedBuilder()
                .setColor('#1c1c1c')
				.setTimestamp()
				.setAuthor({name:client.user.username, iconURL: client.user.avatarURL()})
                .setDescription(message);
				
            try {
                await channel.send({ embeds: [embed] });
                interaction.reply({content:`Mensagem enviada com sucesso para ${channel}!`, ephemeral: true});
            } catch (error) {
                console.error(error);
                interaction.reply({content:'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.', ephemeral: true});
            }
        } else {
            try {
                await channel.send(message);
                interaction.reply({content:`Mensagem enviada com sucesso para ${channel}!`, ephemeral: true});
            } catch (error) {
                console.error(error);
                interaction.reply({content:'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.', ephemeral: true});
            }
        }
    },
    devOnly: true,
};
