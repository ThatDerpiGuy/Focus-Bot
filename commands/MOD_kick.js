const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	aliases: ['boot'],
	usage: '<user>',
	cooldown: 0,
	mod:true,
	execute(message, args, client) {
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		try {
			mentionedUser = message.mentions.members.first()
			if(!mentionedUser){
				respond('', 'User mention was not found.', message.channel)
				return;
			}
			if (message.author.id == message.mentions.members.first().id){
				respond('',`You can't perform this action on yourself.`, message.channel);
				return;
			}
			const {ModeratorRoleID} = require('../config.json');
			if (mentionedUser.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
				respond('',`You can't perform that action on this user.`, message.channel);return;
			}
			if (!args[1]){
				respond('',`Please provide a reason.`, message.channel);
				return;
			  }
			const auditreason = args.join(' ').replace(args[0],'')

			           //Writes reason to JSON
					   userLog = require('../logs/userKicks.json')

					   if (!userLog[mentionedUser.id]){
						userLog[mentionedUser.id] = [];
				   }
			   
					   userLog[mentionedUser.id].push(auditreason);
			   
				   fs.writeFile('./logs/userKicks.json', JSON.stringify(userLog), (err) => {
					 if (err) {
					   console.log(err);
					   respond('',`An error occured during saving.`, message.channel);
					   return;
					 }
				   })

				   console.log(auditreason)
			modaction(this.name, message.author.tag, message.channel.name, message.content, message)
			message.mentions.members.first().kick({reason: `${message.author.tag} | ${auditreason}`})
			respond('⬅️ Kick','<@'+mentionedUser.id+'> was kicked from the server.\nReason: '+auditreason, message.channel)
            respond('⬅️ Kick','You have been kicked from the server. You may rejoin at anytime.\n\nReason for kick: '+auditreason, mentionedUser)
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
}
};