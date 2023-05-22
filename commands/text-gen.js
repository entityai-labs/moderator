const wiki = require("wikijs").default();
const {SlashCommandBuilder, EmbedBuilder, MessageButton, MessageActionRow} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("text-gen")
		.setDescription("Gerar textos com Moderator.")
		.addStringOption(option => option.setName(`query`).setDescription("O tema do texto.")),
	run: async({client, interaction}) => {
		const query = interaction.options.getString(`query`);
		await interaction.deferReply();

		const search = await wiki.search(query);
		if(!search.results.length) return await interaction.editReply({content: `Não foi possível encontrar o tema.`, ephemeral: true});
		const result = await wiki.page(search.results[0]);
		const summary = await result.summary();

		if(summary.length > 8192) {
			const embeds = [];

			for(let i = 0; i < summary.length; i += 2048) {
				const chunk = summary.slice(i, i + 2048);
				const embed = new EmbedBuilder()
					.setColor("#1c1c1c")
					.setTitle(`Seu tema: ${result.raw.title}`)
					.setDescription(`\`\`\`${chunk}\`\`\``)
					.setFooter(`Gerado às ${new Date().toLocaleTimeString()} - ${interaction.client.user.username}`, interaction.client.user.displayAvatarURL())

				embeds.push(embed);
			}

			const components = [];
			if(embeds.length > 1) {
				const back = new MessageButton().setCustomId('back').setEmoji('⬅️').setStyle('PRIMARY');
				const next = new MessageButton().setCustomId('next').setEmoji('➡️').setStyle('PRIMARY');

				components.push(new MessageActionRow().addComponents(back, next));
			}

			const message = await interaction.editReply({embeds: [embeds[0]], components: components});

			let page = 0;
			const filter = i => (i.customId === 'back' || i.customId === 'next') && i.user.id === interaction.user.id;
			const collector = message.createMessageComponentCollector({filter, time: 120000});

			collector.on('collect', async i => {
				await i.deferUpdate();

				if(i.customId === 'back') {
					if(page === 0) page = embeds.length - 1;
					else page--;
				} else if(i.customId === 'next') {
					if(page === embeds.length - 1) page = 0;
					else page++;
				}

				await message.edit({embeds: [embeds[page]], components: components});
			});

			collector.on('end', async () => {
				components.forEach(component => component.components.forEach(c => c.setDisabled(true)));
				await message.edit({components: components});
			});
		} else {
			const embed = new EmbedBuilder()
				.setColor("#1c1c1c")
				.setTitle(`Seu tema: ${result.raw.title}`)
				.setDescription(`\`\`\`${summary}\`\`\``)
				.setFooter({text:`Gerado às ${new Date().toLocaleTimeString()} - ${interaction.client.user.username}`, iconURL:interaction.client.user.displayAvatarURL()})

			await interaction.editReply({embeds: [embed]});
		}
	}
}
