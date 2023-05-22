const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');
require('dotenv/config');
const {CommandHandler} = require('djs-commander');
const path = require('path');
const fs = require("fs");
//const dialogflow = require('@google-cloud/dialogflow');
//const uuid = require('uuid');

const client = new Client({
	intents: [
		 IntentsBitField.Flags.Guilds,
		 IntentsBitField.Flags.GuildMessages,
		 IntentsBitField.Flags.GuildMembers,
		 IntentsBitField.Flags.GuildPresences,
		 IntentsBitField.Flags.MessageContent,
		]
});

new CommandHandler({
	client,
	commandsPath: path.join(__dirname, 'commands'),
	eventsPath: path.join(__dirname, 'events'),
	validationsPath: path.join(__dirname, 'validations'),
	testServer: "1101631075052175410",
})

client.on('guildMemberAdd', async member => {
  

  // Envia a mensagem de boas-vindas na DM do usuário
  const embed = new EmbedBuilder()
    .setColor('#1c1c1c')
    .setTitle(`Seja bem-vindo(a) ${member}!`)
    .setAuthor({name:client.user.username,iconURL: client.user.avatarURL()})
    .setThumbnail(member.guild.iconURL())
	.addFields(
	{name: 'Sobre nós', value: 'A EntityAI é uma empresa especializada no desenvolvimento de soluções de Inteligência Artificial de ponta com diversos modelos de aprendizado. Com uma equipe altamente especializada em ciência da computação, matemática e estatística, a EntityAI está na vanguarda da inovação em IA, criando soluções personalizadas que atendem às necessidades específicas de diversas formas.'}, 
	{name:'\u200B', value: '\u200B'},
    {name:'Cliv', value:'Cliv é uma IA que gera artes baseadas em prompts. Com Cliv, os usuários podem fornecer um prompt, ou seja, uma descrição simples de uma ideia ou conceito, e a IA gera uma imagem criativa a partir dele. Cliv é uma ferramenta útil para artistas, designers e criadores em geral que desejam explorar novas ideias e inspirações.'},
	
    {name: 'Entity-001', value: 'Entity-001 é uma IA que detecta objetos em imagens e vídeos. Usando técnicas avançadas de processamento de imagem, Entity-001 pode identificar objetos específicos em imagens e vídeos, permitindo que os usuários coletem dados e informações úteis. Entity-001 pode ser usado em uma variedade de aplicações, desde segurança até automação de processos.'},
	{name:'Codex', value: 'Codex é um protótipo de IA conversacional e geradora de textos. Os usuários podem interagir com uma IA que é capaz de responder perguntas e até mesmo gerar textos completos. Isso pode ser útil para empresas que desejam melhorar o atendimento ao cliente ou para qualquer pessoa que precise de uma ferramenta para gerar texto automaticamente.'},
	)
    .setTimestamp()
	.setFooter({text:'All rights reserved © EntityAI Corp. 2022-2023'})
	
  member.send({ embeds: [embed] })
    .catch(console.error);
});







client.login(process.env.TOKEN);