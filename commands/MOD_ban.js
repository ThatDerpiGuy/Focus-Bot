module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    aliases: ['banish'],
	usage: '<user> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args, client) {
        try {
			mentionedUser = message.mentions.members.first()
			if(!mentionedUser){
				respond('', 'User mention was not found.', message.channel)
				return;
			}
			if (!args[1]){
				respond('',`Please provide a reason.`, message.channel);
				return;
			  }
			if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
			const {ModeratorRoleID} = require('../config.json');
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
			const user = message.mentions.members.first();
			const userToBan = message.mentions.members.first()
			const userid = message.mentions.members.first().id
			const guild = message.guild
			const authorusername = message.author.username +'#' +message.author.discriminator
			let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
			var reason = reasonraw.join(' ')
			if(reason == ''){var reason = 'No reason provided.'}

						//Writes reason to JSON
					   userLog = require('../logs/userBans.json')

					   if (!userLog[mentionedUser.id]){
							userLog[mentionedUser.id] = [];
					   }
			   
					   userLog[mentionedUser.id].push(reason);
			   
				   fs.writeFile('./logs/userBans.json', JSON.stringify(userLog), (err) => {
					 if (err) {
					   console.log(err);
					   respond('',`An error occured during saving.`, message.channel);
					   return;
					 }
				   })
			respond('🔨 Ban','<@'+userid+`> was banned. User has ${userLog[mentionedUser.id].length} bans.\nReason: `+reason, message.channel)
			respond('Banned','You were banned from the Apple Explained server due to: '+ reason+'\n\nThis ban does not expire. ', user)
			userToBan.ban({reason: `${message.author.tag}, ${reason}`})
			modaction(this.name, message.author.tag, message.channel.name, message.content, message)
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};
