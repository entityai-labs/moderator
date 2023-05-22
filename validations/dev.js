module.exports = (interaction, commandObj) => {
  if (commandObj.devOnly) {
  	if (interaction.member.id !== "1084118761407254578"){
  		interaction.reply({content:"Apenas moderadores podem utilizar esse comando.", ephemeral: true});
  	} //ID dev
  }
}