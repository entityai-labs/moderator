const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');
const uptime = process.uptime();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Retorna a latência do Moderator.'),

  run: async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('Latência e Uptime')
      .setColor('#1c1c1c')
      .setDescription(`Latência: \`${Math.round(interaction.client.ws.ping)} ms\`\nTempo de atividade: \`${ms(uptime * 1000, { long: true })}\``)
      .setFooter({text:' ',name:client.user.username, iconURL: client.user.avatarURL()})
	  

    await interaction.reply({ embeds: [embed] });
  },

  devOnly: true,
};
