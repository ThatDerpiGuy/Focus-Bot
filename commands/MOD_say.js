module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'Has the bot speak.',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {	
		const { prefix } = require('../config.json');
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const text = args.join(' ');
    message.channel.send(text)
    message.delete()
  }}